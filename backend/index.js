import express from "express";
import { json } from "express";
import multer from "multer";
import { PORT } from "./env.js";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { printerRouter } from "./routes/printerRouter.js";
import { printOrderRouter } from "./routes/printOrderRouter.js";
import userRouter from "./routes/userRouter.js";
import pageRouter from "./routes/pageRouter.js";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename as a timestamp + original name
  },
});
export const upload = multer({ storage: storage });

app.use(json());
app.use(cors());

app.use("/user", userRouter);
app.use("/printers", printerRouter);
app.use("/print", upload.single("file"), printOrderRouter);
app.use("/page", pageRouter);

app.listen(PORT, () => {
  console.log(`App is running in PORT ${PORT}`);
});
