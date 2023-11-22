import { db } from "../config/dbConfig.js";

class UserModel {
  constructor() {
    this.result = [];
  }

  async login(username, password) {
    let sql = `SELECT * FROM users WHERE email=? AND password=?;`;
    this.result = await db.execute(sql, [username, password]);

    //console.log(this.result);

    if (this.result[0].length != 0) {
      console.log("here");
      let sql2 = `SELECT * FROM spso WHERE spsoID=?;`;
      var spsoResult = await db.execute(sql2, [this.result[0][0].userID]);
    }

    if (this.result[0].length != 0) {
      if (this.result[0][0].status == "Active") {
        if (spsoResult[0][0]) {
          return {
            userID: this.result[0][0].userID,
            message: "Login successful",
            isSPSO: true,
          };
        } else {
          return {
            userID: this.result[0][0].userID,
            message: "Login successful",
            isSPSO: false,
          };
        }
      } else {
        return { userID: null, message: "Inactive user", isSPSO: null };
      }
    } else {
      //console.log("here");
      return { userID: null, message: "Invalid credentials", isSPSO: null };
    }
  }

  async getAllUsers() {
    try {
      let sql = `SELECT * FROM users;`;
      // Gán kết quả cho thuộc tính result của đối tượng hiện tại
      this.result = await db.execute(sql);
      return this.result[0];
    } catch (error) {
      // Xử lý lỗi nếu có
      //console.error(error);
      throw new Error("Error fetching users");
    }
  }

  async getUserById(userId) {
    try {
      let sql = `SELECT * FROM users WHERE userID = ?;`;
      this.result = await db.execute(sql, [userId]);
      return this.result[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching user by ID");
    }
  }

  async updateUserById(userId, newData) {
    try {
      let name = newData.name;
      let DoB = new Date(newData.DoB);
      let phone = newData.phone;
      let address = newData.address;

      let sql = `UPDATE users SET name = ?, DoB = ?, phone = ?, address = ? WHERE userID = ?;`;
      this.result = await db.execute(sql, [name, DoB, phone, address, userId]);
      return this.result;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating user by ID");
    }
  }
}

export default UserModel;
