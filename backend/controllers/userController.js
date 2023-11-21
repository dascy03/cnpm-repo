// userController.js
import UserModel from "../models/userModel.js";

const userModel = new UserModel();

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

      //console.log(result);

      if (result.userID !== null) {
        // Đăng nhập thành công
        res.status(200).json({ success: true, ...result });
      } else {
        res.status(401).json({ success: false, ...result });
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
      return res.json(users[0]);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
}

export default UserController;

// */

/*
export const displayAllUsers = async (req, res) => {
  try {
    const users = UserModel.getAllUsers();
    return res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
// */
