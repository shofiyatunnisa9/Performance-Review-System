import dotenv from "dotenv";
import express from "express";
import { authRoute } from "./routes/authRoute.js";
import { employeesRoute } from "./routes/employeeRoute.js";
import { reviewsRoute } from "./routes/reviewRoute.js";
import corsMiddleware from "./config/cors.js";

dotenv.config();
const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api", employeesRoute);
app.use("/api/employees", reviewsRoute);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});
