import { PrintOrder } from "../models/printOrderModel.js";
import { db } from "../config/dbConfig.js";
import { Printer } from "../models/Printer.js";
import PDFParser from "pdf2json";
import { DocxCounter } from "page-count";
import { readFileSync } from "fs";

const handleFile = async (req) => {
  try {
    const pdfPath = req.file.path;
    let result = [req.file.originalname];
    if (result[0].slice(-4, -1) === "doc") {
      const docxBuffer = readFileSync(pdfPath);
      const pages = await DocxCounter.count(docxBuffer);
      result.push(pages);
      return result;
    }

    const parsePDF = (path) => {
      return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData) => {
          reject(errData.parserError);
        });
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          resolve(pdfData);
        });
        pdfParser.loadPDF(path);
      });
    };
    const pdfData = await parsePDF(pdfPath);
    result.push(pdfData.Pages.length);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleOrder = async (req, res) => {
  try {
    const { printorderID } = req.params;
    let [current_status, _] = await PrintOrder.getOrderStatus(printorderID);
    current_status = current_status[0]["status"];
    let result;
    if (current_status === "Chờ in")
      result = await PrintOrder.setOrderStatus(printorderID, "Đã huỷ");
    else if (current_status === "Hoàn tất in")
      result = await PrintOrder.setOrderStatus(printorderID, "Hoàn thành");
    else return res.status(200).send({ message: "nothing change" });
    if (!result) return res.status(400).send({ message: "Update order fail" });
    return res.status(200).send({ message: "ok" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { printorderID } = req.params;
    const result = await PrintOrder.setOrderStatus(printorderID, "Đã huỷ");
    if (!result) return res.status(400).send({ message: "Update order fail" });
    return res.status(200).send({ message: "ok" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAllQueue = async (req, res) => {
  try {
    const queue = await PrintOrder.getAllQueue();
    return res.send(queue);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getOneQueue = async (req, res) => {
  try {
    const { printerID } = req.params;
    const queue = await PrintOrder.getQueue(printerID);
    return res.send(queue);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const { userID } = req.params;
    const order = await PrintOrder.getOrderByUser(userID);
    return res.send(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAllPrintOrder = async (req, res) => {
  try {
    const orders = await PrintOrder.getAllOrder();
    return res.json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const insertPrintOrder = async (req, res) => {
  try {
    const {
      pickupTime,
      printTime,
      printerID,
      printCopy,
      pageSize,
      pickupMethod,
      pageSide,
      pageColor,
      userID,
    } = req.body;
    const file_data = await handleFile(req);
    if (!file_data)
      return res.status(400).send({ message: "Please upload file to print!" });
    const fileName = file_data[0];
    const pageSelected = file_data[1];
    const status = "Chờ in";
    let sizeWeight;
    switch (pageSize) {
      case "A4":
        sizeWeight = 1;
        break;
      case "A3":
        sizeWeight = 2;
        break;
      case "A2":
        sizeWeight = 3;
        break;
      case "A1":
        sizeWeight = 4;
        break;
      default:
        sizeWeight = 1;
    }
    let colorWeight;
    if (pageColor == "Có") colorWeight = 2;
    else colorWeight = 1;
    let sideWeight;
    if (pageSide == "Hai mặt") sideWeight = 0.5;
    else sideWeight = 1;
    const totalPageUsed =
      Math.ceil(pageSelected * sizeWeight * colorWeight * sideWeight) *
      printCopy;

    const [current_printer, _] = await Printer.getByID(printerID);
    // compare printTime and pickupTime
    const date1 = new Date(printTime);
    const date2 = new Date(pickupTime);
    if (date2 < date1)
      return res
        .status(400)
        .send({ message: "Your chosen pickupTime is wrong!" });
    // check status
    if (current_printer["status"] === "Ngưng hoạt động")
      return res
        .status(400)
        .send({ message: "The current printer is not active!" });
    // check printer page balance
    if (current_printer["pageBalance"] < totalPageUsed)
      return res
        .status(400)
        .send({ message: "The current printer do not have enough paper!" });
    // check user page balance
    const [userPageBalance, __] = await db.execute(
      `SELECT pageBalance FROM users WHERE userID=?;`,
      [userID]
    );
    if (userPageBalance[0]["pageBalance"] < totalPageUsed)
      return res.status(400).send({ message: "You do not have enough page!" });
    // check print time
    const current_queue = await PrintOrder.getQueue(printerID);
    const isPresent = current_queue.some(
      (item) => item.printTime === printTime
    );
    if (isPresent)
      return res.status(400).send({
        message: "The current printer has another order at your chosen time!",
      });
    // save
    const print_order = await PrintOrder.save(
      pickupTime,
      printTime,
      status,
      fileName,
      pickupMethod,
      totalPageUsed,
      printerID,
      userID
    );
    console.log("Insert new print order");

    const print_orderID = print_order["insertId"];

    // real-time printing
    const currentTime = new Date();
    const targetTime = new Date(printTime);
    const timeDifference = targetTime - currentTime;
    console.log(timeDifference);
    if (timeDifference > 0) {
      setTimeout(async () => {
        await PrintOrder.setOrderStatus(print_orderID, "Đang in");

        // Reschedule if needed
        setTimeout(() => {
          PrintOrder.setOrderStatus(print_orderID, "Hoàn tất in");
        }, 10000);
      }, timeDifference);
    }

    return res.status(200).send(print_order);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getStatus = async (printerID) => {
  const [status, _] = await db.execute(
    `SELECT status FROM printer WHERE printerID='${printerID}';`
  );
  return status[0]["status"];
};

export const updatePrinter = async (req, res) => {
  try {
    let { printerID } = req.params;
    printerID = Number(printerID);
    if (!printerID) {
      return res
        .status(400)
        .send({ message: "Please provide a valid Printer ID!" });
    }
    const currentStatus = await getStatus(printerID);
    if (currentStatus == "Đang hoạt động") {
      return res
        .status(400)
        .send({ message: "Please deactivate printer before update!" });
    }

    const { model, location, status } = req.body;
    if (!model) {
      return res.status(400).send({ message: "Please send Printer model!" });
    }
    let printer = new Printer(model, location, status);
    printer = await printer.update(printerID);
    return res.status(200).send(printer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
