import  express  from "express";
import { addFood , listFood , removeFood } from "../controllers/foodcontroller.js";
import multer from "multer";


const foodrouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }
}) 

const upload = multer({storage:storage})

foodrouter.post("/add" , upload.single("image"),addFood)
foodrouter.get("/list" , listFood )
foodrouter.post("/remove" , removeFood);












export default foodrouter;