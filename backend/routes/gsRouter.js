import { Router } from "express";
import {
  displayGeneralSetting,
} from "../controllers/gsController.js";

const router = Router();
router.route("/").get(displayGeneralSetting);

export const gsRouter = router;
