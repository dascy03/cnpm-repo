import express from "express";
import { json } from "express";
import { PORT } from "./env.js";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { printerRouter } from "./routes/printerRouter.js";
import {gsRouter} from "./routes/gsRouter.js";
const app = express();

app.use(json());
app.use(cors());

app.use("/printers", printerRouter);
app.use("/gs", gsRouter);

app.listen(PORT, () => {
  console.log(`App is running in PORT ${PORT}`);
});
