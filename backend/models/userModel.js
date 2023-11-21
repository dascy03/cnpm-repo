import { db } from "../config/dbConfig.js";

class UserModel {
  constructor() {
    this.result = [];
  }

  // /*
  async login(username, password) {
    let sql = `SELECT * FROM users WHERE email=? AND password=?;`;
    this.result = await db.execute(sql, [username, password]);

    //console.log(this.result);

    let sql2 = `SELECT * FROM spso WHERE spsoID=?;`;
    var spsoResult = await db.execute(sql2, [this.result[0][0].userID]);
    //console.log(spsoResult);

    if (this.result[0]) {
      if (spsoResult[0][0]) {
        return {
          userID: this.result[0][0].userID,
          message: "Login successful",
          isSPSO: true,
        };
      } else {
        console.log("hereherehere");
        return {
          userID: this.result[0][0].userID,
          message: "Login successful",
          isSPSO: false,
        };
      }
    } else {
      return { userID: null, message: "Invalid credentials", isSPSO: null };
    }
  }

  // */

  async getAllUsers() {
    try {
      let sql = `SELECT * FROM users;`;
      // Gán kết quả cho thuộc tính result của đối tượng hiện tại
      this.result = await db.execute(sql);
      return this.result;
    } catch (error) {
      // Xử lý lỗi nếu có
      //console.error(error);
      throw new Error("Error fetching users");
    }
  }
}

export default UserModel;
