import { Router } from "express";
import {
  getAllPrintOrder,
  insertPrintOrder,
  getAllQueue,
  getOneQueue,
  getOneOrder,
} from "../controllers/printOrderController.js";
//locahost:5000/print/...
const router = Router();
router
  .route("/orders")
  .get(getAllPrintOrder) // truy xuat thong tin tat ca don in
  .post(insertPrintOrder); // tao thong tin don in
router.route("/orders/:userID").get(getOneOrder); // truy xuat don in theo user ID
router.route("/queues").get(getAllQueue); // truy xuat hang doi cua tat ca may in
router.route("/:printerID/queue").get(getOneQueue); // truy xuat hang doi hien tai cua may in theo ID
export const printOrderRouter = router;
