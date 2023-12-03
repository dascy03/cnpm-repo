import { Router } from "express";
import {
  getAllPrinter,
  addPrinter,
  deletePrinter,
  updatePrinter,
  getPrinter,
  getPrinterStatus,
  getPageBalance,
  setPrinterStatus,
} from "../controllers/printerController.js";
// locahost:5000/printers/...
const router = Router();
router
  .route("/")
  .get(getAllPrinter) // truy xuat danh sach may in
  .post(addPrinter); // them may in

router
  .route("/:printerID")
  .get(getPrinter) // truy xuat thong tin may in theo ID
  .delete(deletePrinter) // xoa may in theo ID
  .put(updatePrinter); // cap nhat may in theo ID
router
  .route("/:printerID/status")
  .get(getPrinterStatus) // truy xuat trang thai may in theo ID
  .put(setPrinterStatus); // thay doi trang thai may in theo ID
router.route("/:printerID/page-balance").get(getPageBalance); // truy xuat so luong trang hien co cua may in theo ID

export const printerRouter = router;
