import { db } from "../config/dbConfig.js";

export class PrintOrder {
  static save = async (
    pickupTime,
    printTime,
    status,
    fileName,
    pickupMethod,
    totalPageUsed,
    printerID,
    userId
  ) => {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();
      let sql = `INSERT INTO print_order(pickupTime, printTime, status, fileName, pickupMethod, totalPageUsed, printerID, userID)
  VALUES (?,?,?,?,?,?,?,?)`;
      const [newPrintOrder, _] = await connection.execute(sql, [
        pickupTime,
        printTime,
        status,
        fileName,
        pickupMethod,
        totalPageUsed,
        printerID,
        userId,
      ]);
      await connection.commit();

      return newPrintOrder;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  update = async (printerID) => {
    let sql = `
        UPDATE printer
        SET model='${this.model}', location='${this.location}', status='${this.status}'
        WHERE printerID='${printerID}'`;
    const [newPrinter, _] = await db.execute(sql);
    return newPrinter;
  };
  static getQueue = async (printerID) => {
    const [printerQueue, _] = await db.execute(
      `SELECT printorderID, model, DATE_FORMAT(printTime, "%Y-%m-%d %H:%i:%s") AS printTime, email, print_order.status FROM printer JOIN print_order ON printer.printerID=print_order.printerID JOIN users ON print_order.userID=users.userID WHERE printer.printerID=? ORDER BY printer.printerID, printTime;`,
      [printerID]
    );
    return printerQueue;
  };
  static getAllQueue = async () => {
    const [printerQueue, _] = await db.execute(
      `SELECT printorderID, model, DATE_FORMAT(printTime, "%Y-%m-%d %H:%i:%s") AS printTime, email, print_order.status FROM printer JOIN print_order ON printer.printerID=print_order.printerID JOIN users ON print_order.userID=users.userID ORDER BY printer.printerID, printTime;`
    );
    return printerQueue;
  };
}
