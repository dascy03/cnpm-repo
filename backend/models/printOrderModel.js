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

  static getOrderStatus = async (printorderID) => {
    const orderStatus = await db.execute(
      `SELECT status FROM print_order WHERE printorderID=?;`,
      [printorderID]
    );
    return orderStatus;
  };

  static setOrderStatus = async (printorderID, newStatus) => {
    const [result, _] = await db.execute(
      `UPDATE print_order SET status = ? WHERE printorderID = ?;`,
      [newStatus, printorderID]
    );
    return result;
  };

  static getOrderByUser = async (userID) => {
    const [orderDetail, _] = await db.execute(
      `SELECT printorderID, DATE_FORMAT(printTime, "%Y-%m-%d %H:%i:%s") AS printTime, DATE_FORMAT(pickupTime, "%Y-%m-%d %H:%i:%s") AS pickupTime, fileName, model, pickupMethod, totalPageUsed, print_order.status FROM printer JOIN print_order ON printer.printerID=print_order.printerID WHERE print_order.userID=? ORDER BY printTime;`,
      [userID]
    );
    return orderDetail;
  };

  static getAllOrder = async () => {
    const [orderDetail, _] = await db.execute(
      `SELECT printorderID, DATE_FORMAT(printTime, "%Y-%m-%d %H:%i:%s") AS printTime, DATE_FORMAT(pickupTime, "%Y-%m-%d %H:%i:%s") AS pickupTime, fileName, model, pickupMethod, totalPageUsed, print_order.status FROM printer JOIN print_order ON printer.printerID=print_order.printerID ORDER BY printTime;`
    );
    return orderDetail;
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
