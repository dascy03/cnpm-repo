import { Router } from "express";
import {
  getAllPrintOrder,
  insertPrintOrder,
} from "../controllers/printOrderController.js";

const router = Router();
router.route("/").get(getAllPrintOrder).post(insertPrintOrder);
export const printOrderRouter = router;
