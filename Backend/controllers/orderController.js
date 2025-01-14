import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user model from frontend

const placeorder = async (req,res) =>{

    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(eq.body.userId, {cartData :{}});

        const line_item = req.body.items.map(()=>({
            price_data:{
                currency: "inr",
                product_data :{
                    name:item.name
                },
                unit_amount : item.price*100*80
            },
            qantity :item.qantity

        })

        )

        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"delivery charges"
                },
                unit_amount:2*100*80
            },
            qantity:1
        })


        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}` 
        })

        res.json({success:true , session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:"error"})
        
    }



}

const verifyOrder = async (req,res) =>{
    const {orderId , success} = req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true , message:"Paid"})

            
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false , message:"Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false , message:"error"})
        
    } 

}

//user order for frontend

const userOrder = async (req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true , data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:"error"})
        
    }

}



export {placeorder , verifyOrder , userOrder}