import { db } from "../config/dbConfig.js";

export class Printer {
  constructor(model, type, location, status) {
    this.model = model;
    if (type) this.type = type;
    else this.type = "Normal";
    if (location) this.location = location;
    else this.location = "H1 lobby";
    if (status) this.status = status;
    else this.status = "active";
  }
  save = async () => {
    let sql = `
        INSERT INTO printer(
            model,
            type,
            location,
            status
        )
        VALUES(
            '${this.model}',
            '${this.type}',
            '${this.location}',
            '${this.status}'
        )`;
    const [newPrinter, _] = await db.execute(sql);
    return newPrinter;
  };
}
