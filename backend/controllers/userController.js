// userController.js
import UserModel from "../models/userModel.js";
import CookieController from "../controllers/cookieController.js";

const userModel = new UserModel();
const cookieController = new CookieController();

class UserController {
  constructor() {
    //this.model = new UserModel();
  }

  async handleLogin(req, res) {
    try {
      const { username, password } = req.body;

      //var username = "john.doe@example.com";
      //var password = "hashedpassword1";

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required.",
        });
      }

      const result = await userModel.login(username, password);

      console.log(result);

      if (result.userID !== null) {
        let key = "cnpm231";

        var payload = result.userID;

        var tokenResult = cookieController.encodeCookie(payload, key);
        //console.log(tokenResult);

        // Đăng nhập thành công
        res
          .status(200)
          .json({ success: true, token: tokenResult, isSPSO: result.isSPSO });
      } else {
        res.status(401).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async displayAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }

  async displayUserInfo(req, res) {
    try {
      const { token } = req.body;
      let userId = cookieController.decodeCookie(token);

      const user = await userModel.getUserById(userId);

      if (user.length === 0) {
        res.status(404).json({ success: false, message: "User not found" });
      } else {
        res.status(200).json({ success: true, data: user[0] });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async updateUserInfo(req, res) {
    try {
      const newData = req.body;

      /*
      const newData = {
        token:"123678cnpm231",
        name: "John Doe",
        DoB: "1990-01-15",
        phone: "0000000",
        address: "123 Main St",
      }; */

      const userId = cookieController.decodeCookie(newData.token);
      const result = await userModel.updateUserById(userId, newData);

      if (result.affectedRows === 0) {
        res.status(404).json({ success: false, message: "User not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "User updated successfully" });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}

export default UserController;
