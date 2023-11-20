import { Printer } from "../models/Printer.js";
import { db } from "../config/dbConfig.js";

export const getAllPrinter = async (req, res) => {
  try {
    let sql = `
    SELECT *
    FROM printer;`;
    const data = await db.execute(sql);
    return res.json(data[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const addPrinter = async (req, res) => {
  try {
    const { model, type, location, status } = req.body;
    if (!model) {
      return res.status(400).send({ message: "Pls send Printer model!" });
    }
    let printer = new Printer(model, type, location, status);
    printer = await printer.save();
    console.log("Add new printer");
    return res.status(201).send(printer);
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
    console.log("Deleted printer:", printerID);
    return res.status(200).send({ message: "Printer deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
