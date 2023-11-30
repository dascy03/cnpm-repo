import { PrintOrder } from "../models/printOrderModel.js";
import { db } from "../config/dbConfig.js";
import { Printer } from "../models/Printer.js";

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

export const getAllPrintOrder = async (req, res) => {
  try {
    let sql = `SELECT * FROM print_order;`;
    const data = await db.execute(sql);
    return res.json(data[0]);
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
      fileName,
      printerID,
      printCopy,
      pageSize,
      pickupMethod,
      pageSide,
      pageSelected,
      pageColor,
      userID,
    } = req.body;

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
    // check status
    if (current_printer["status"] === "Ngưng hoạt động")
      return res
        .status(400)
        .send({ message: "The current printer is not active!" });
    // check page balance
    if (current_printer["pageBalance"] < totalPageUsed)
      return res
        .status(400)
        .send({ message: "The current printer do not have enough paper!" });
    // check print time
    const current_queue = await Printer.getQueue(printerID);
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
    return res.status(200).send(print_order);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deletePrinter = async (req, res) => {
  try {
    const { printerID } = req.params;

    if (!printerID) {
      return res
        .status(400)
        .send({ message: "Please provide a valid Printer ID!" });
    }

    let sql = `DELETE FROM printer WHERE printerID = ${printerID};`;
    await db.execute(sql);
    console.log("Delete printer:", printerID);
    return res.status(200).send({ message: "Delete printer successfully!" });
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
