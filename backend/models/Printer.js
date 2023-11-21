import { db } from "../config/dbConfig.js";

export class Printer {
  constructor(model, location, status) {
    this.model = model;

    if (location) this.location = location;
    else this.location = "H1 lobby";
    if (status) this.status = status;
    else this.status = "active";
  }
  save = async () => {
    let sql = `
        INSERT INTO printer(
            model,
            location,
            status
        )
        VALUES(
            '${this.model}',
            '${this.location}',
            '${this.status}'
        )`;
    const [newPrinter, _] = await db.execute(sql);
    return newPrinter;
  };
  update = async (printerID) => {
    let sql = `
        UPDATE printer
        SET model='${this.model}', location='${this.location}', status='${this.status}'
        WHERE printerID='${printerID}'`;
    const [newPrinter, _] = await db.execute(sql);
    return newPrinter;
  };
}
