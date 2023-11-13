import { Router } from "express";
import { getAllPrinter } from "../controllers/printerController.js";

const router = Router();
router.route("/").get(getAllPrinter);

export const printerRouter = router;
