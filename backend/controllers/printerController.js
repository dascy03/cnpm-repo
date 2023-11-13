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
