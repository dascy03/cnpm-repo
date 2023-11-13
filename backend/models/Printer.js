import { db } from "../config/dbConfig.js";

export class Printer {
  constructor(printerID, model, type) {
    this.printerID = printerID;
    this.model = model;
    this.type = type;
  }
  save = async () => {
    let sql = `
        INSERT INTO Printer(
            printerID,
            model,
            type
        )
        VALUES(
            '${this.printerID}',
            '${this.model}',
            '${this.type}'
        )`;
    const [newPrinter, _] = await db.execute(sql);
    return newPrinter;
  };
}
