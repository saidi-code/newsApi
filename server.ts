import { db } from "./datastore";
import express from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { loogerMiddleware } from "./middlewares/loggerMiddleware";
import dotenv from "dotenv";
import appRoutes from "./routes";
import expressAsyncHandler from "express-async-handler";
dotenv.config();

const app = express();
app.use(express.json());
app.use(loogerMiddleware);

app.use("/api/v1", appRoutes);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server start at port PORT ${PORT}`);
});
