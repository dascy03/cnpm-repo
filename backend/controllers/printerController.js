import { Printer } from "../models/Printer.js";
import { db } from "../config/dbConfig.js";

export const setPrinterStatus = async (req, res) => {
  try {
    const { printerID } = req.params;
    const order_status = await Printer.getOrderStatus(printerID);
    const isPresent = order_status.some((item) => item.status === "Đang hoạt động ");
    if (isPresent)
      return res.status(400).send({
        message:
          "The current printer is perfoming printing, cannot be blocked!",
      });
    await Printer.setPrinterStatus(printerID);
    return res.send("success");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getPageBalance = async (req, res) => {
  try {
    const { printerID } = req.params;
    const pageBalance = await Printer.getPageBalance(printerID);
    return res.send(pageBalance[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getPrinterStatus = async (req, res) => {
  try {
    const { printerID } = req.params;
    const status = await Printer.getPrinterStatus(printerID);
    return res.send(status[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getPrinter = async (req, res) => {
  try {
    const { printerID } = req.params;
    const printer = await Printer.getByID(printerID);
    return res.send(printer[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAllPrinter = async (req, res) => {
  try {
    let sql = `SELECT * FROM printer;`;
    const data = await db.execute(sql);
    return res.json(data[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const addPrinter = async (req, res) => {
  try {
    const { model, location, status } = req.body;
    if (!model) {
      return res.status(400).send({ message: "Please send Printer model!" });
    }
    let printer = new Printer(model, location, status);
    printer = await printer.save();
    console.log("Add new printer");
    return res.status(200).send(printer);
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
