import { db } from "../config/dbConfig.js";

class PageModel {
  constructor() {
    this.result = [];
  }
  async purchasePage(userId, pageAmount, paymentMethod) {
    try {
      const totalPrice = pageAmount * 1000;

      const sql = `
        INSERT INTO page_purchase (userID, pageAmount, paymentMethod, unitPrice, totalPrice)
        VALUES (?, ?, ?, ?, ?);
      `;

      // Thực thi câu lệnh SQL
      this.result = await db.execute(sql, [
        userId,
        pageAmount,
        paymentMethod,
        1000,
        totalPrice,
      ]);

      if (this.result[0].affectedRows > 0) {
        const updateSql = `UPDATE users SET pageBalance = pageBalance + ? WHERE userID = ?;`;
        const updateResult = await db.execute(updateSql, [pageAmount, userId]);
        //console.log(updateResult[0].affectedRows);
        return updateResult[0].affectedRows;
      }

      return this.result[0].affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error purchasing page.");
    }
  }

  async getPagePurchaseHistory(userId) {
    try {
      const sql = `SELECT * FROM page_purchase WHERE userID = ?;`;
      this.result = await db.execute(sql, [userId]);

      return this.result[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching page purchase history");
    }
  }
}

export default PageModel;
