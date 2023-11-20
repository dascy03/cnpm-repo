import { Router } from "express";
import {
  getAllPrinter,
  addPrinter,
  deletePrinter,
} from "../controllers/printerController.js";

const router = Router();
router.route("/").get(getAllPrinter).post(addPrinter);
router.route("/:printerID").delete(deletePrinter);
export const printerRouter = router;
