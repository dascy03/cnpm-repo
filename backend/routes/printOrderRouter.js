import { Router } from "express";
import {
  getAllPrintOrder,
  insertPrintOrder,
  getAllQueue,
  getOneQueue,
  getOneOrder,
  handleOrder,
  cancelOrder,
  getPrintOrderByTime,
} from "../controllers/printOrderController.js";
//locahost:5000/print/...
const router = Router();
router
  .route("/orders")
  .get(getAllPrintOrder) // truy xuat thong tin tat ca don in
  .post(insertPrintOrder); // tao thong tin don in
router.route("/orders/:userID").get(getOneOrder); // truy xuat don in theo user ID
router.route("/orders/update/:printorderID").put(handleOrder); // xu ly don in tu user
router.route("/orders/admin/:printorderID").put(cancelOrder); // admin huy don in (hang doi)
router.route("/orders/admin/:time").get(getPrintOrderByTime); // admin dashboard

router.route("/queues").get(getAllQueue); // truy xuat hang doi cua tat ca may in
router.route("/:printerID/queue").get(getOneQueue); // truy xuat hang doi hien tai cua may in theo ID
export const printOrderRouter = router;
