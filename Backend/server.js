import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodrouter from "./routes/foodroute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//add config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection

connectDB();

//API ENDPOINT
app.use("/api/food", foodrouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart" , cartRouter)
app.use("/api/order" , orderRouter)

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

//mongodb+srv://tanishqprojects:<db_password>@cluster0.d5icr.mongodb.net/?
