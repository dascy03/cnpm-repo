import { db } from "../config/dbConfig.js";

export class Printer {
  constructor(model, location, status) {
    this.model = model;

    if (location) this.location = location;
    else this.location = "H1 - Lầu 1";
    if (status) this.status = status;
    else this.status = "Đang hoạt động";
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
  static getByID = async (printerID) => {
    const [printer, _] = await db.execute(
      `SELECT * FROM printer WHERE printerID=?`,
      [printerID]
    );
    return printer;
  };
  static getPageBalance = async (printerID) => {
    const [pageBalance, _] = await db.execute(
      `SELECT pageBalance FROM printer WHERE printerID=?`,
      [printerID]
    );
    return pageBalance;
  };
  static getPrinterStatus = async (printerID) => {
    const [printerStatus, _] = await db.execute(
      `SELECT status FROM printer WHERE printerID=?`,
      [printerID]
    );
    return printerStatus;
  };
  static setPrinterStatus = async (printerID) => {
    const [current_status, __] = await this.getPrinterStatus(printerID);

    if (current_status["status"] === "Đang hoạt động") {
      const [printerStatus, _] = await db.execute(
        `UPDATE printer SET status = 'Ngưng hoạt động' WHERE printerID=?`,
        [printerID]
      );
      return printerStatus;
    } else {
      const [printerStatus, _] = await db.execute(
        `UPDATE printer SET status = 'Đang hoạt động' WHERE printerID=?`,
        [printerID]
      );
      return printerStatus;
    }
  };
  static getOrderStatus = async (printerID) => {
    const [orderStatus, _] = await db.execute(
      `SELECT print_order.status FROM printer JOIN print_order ON printer.printerID=print_order.printerID WHERE printer.printerID = ?;`,
      [printerID]
    );

    return orderStatus;
  };
}
