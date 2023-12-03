import PageModel from "../models/pageModel.js";
import CookieController from "../controllers/cookieController.js";

const pageModel = new PageModel();
const cookieController = new CookieController();

class PageController {
  // Import model và các module cần thiết

  async handlePagePurchase(req, res) {
    try {
      const { token, pageAmount, paymentMethod } = req.body;
      let userId = cookieController.decodeCookie(token);

      //console.log(userId);

      // const userId = 7;
      // const pageAmount = 56;
      // const paymentMethod = "Momo";

      if (!pageAmount || !paymentMethod) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required information." });
      }

      const purchaseResult = await pageModel.purchasePage(
        userId,
        pageAmount,
        paymentMethod
      );

      if (purchaseResult > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Page purchase successful." });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Page purchase failed." });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async displayPagePurchaseHistory(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      //const { token } = req.body;
      let userId = cookieController.decodeCookie(token);
      //const userId = 4;
      const pagePurchaseHistory = await pageModel.getPagePurchaseHistory(
        userId
      );
      return res.json(pagePurchaseHistory);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}

export default PageController;
