import { Router } from "express";
import {
  getAllPrintOrder,
  insertPrintOrder,
  getAllQueue,
  getOneQueue,
} from "../controllers/printOrderController.js";
//locahost:5000/print/...
const router = Router();
router
  .route("/orders")
  .get(getAllPrintOrder) // truy xuat thong tin don in
  .post(insertPrintOrder); // tao thong tin don in
router.route("/queues").get(getAllQueue); // truy xuat hang doi cua tat ca may in
router.route("/:printerID/queue").get(getOneQueue); // truy xuat hang doi hien tai cua may in theo ID
export const printOrderRouter = router;
