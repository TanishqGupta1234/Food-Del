import express  from "express";
import authMiddleware from "../middleware/auth.js"
import { placeorder, verifyOrder , userOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place" , authMiddleware,placeorder);
orderRouter.post("/verify" , verifyOrder)
orderRouter.post("/userOrders", authMiddleware,userOrder)



export default orderRouter;