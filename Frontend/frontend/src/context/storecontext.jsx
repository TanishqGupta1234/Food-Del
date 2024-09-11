import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)


const StoreContextProvider = (props) =>{
    const [cartItem , setcartItem] = useState({});
    const url ="http://localhost:4000"
    const [token,setToken] = useState("");

    const addToCart = async (itemId) =>{
        if(!cartItem[itemId]){
            setcartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcartItem((prev)=>({prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add" , {itemId} , {headers:{token}})
        }

    }

    const removeFromCart = (itemId) =>{
        setcartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartamount = () =>{
        let totalAmount =0;
        for(const item in cartItem)

        {
            if (cartItem[item]>0) {
                
                let iteminfon = food_list.find((product)=>product._id === item);
                totalAmount +=iteminfon.price* cartItem[item];
            }
        

        }
        return totalAmount;
    } 




    useEffect(()=>{
       if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        
       }

    } , [cartItem])

    const contextValue ={
        food_list,
        cartItem,
        setcartItem,
        addToCart,
        removeFromCart,
        getTotalCartamount,
        url,
        token,
        setToken


    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;