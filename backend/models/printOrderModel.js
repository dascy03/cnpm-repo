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
}
