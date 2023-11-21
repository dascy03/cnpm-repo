import { Router } from "express";
import {
  getAllPrinter,
  addPrinter,
  deletePrinter,
  updatePrinter,
} from "../controllers/printerController.js";

const router = Router();
router.route("/").get(getAllPrinter).post(addPrinter);
router.route("/:printerID").delete(deletePrinter).put(updatePrinter);
export const printerRouter = router;
