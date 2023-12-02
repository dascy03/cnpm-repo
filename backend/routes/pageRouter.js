import { Router } from "express";
import PageController from "../controllers/pageController.js";

const pageRouter = Router();
const pageController = new PageController();

pageRouter.get("/history", pageController.displayPagePurchaseHistory);
pageRouter.post("/buy", pageController.handlePagePurchase);

export default pageRouter;
