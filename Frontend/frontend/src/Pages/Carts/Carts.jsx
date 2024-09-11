import React, { useContext } from "react";
import { StoreContext } from "../../context/storecontext";
import "./Carts.css";
import { useNavigate } from "react-router-dom";

const Carts = () => {
  const { cartItem, food_list, removeFromCart  , getTotalCartamount} = useContext(StoreContext);
  const navigate = useNavigate();

  if (!cartItem || !food_list) {
    return <div>Loading...</div>; // or some other fallback
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart_item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] !== undefined && cartItem[item._id] > 0) {
            return (
              <div>
                <div className="cart-itemsss-title cart-items-title">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className="cross">X</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fees</p>
              <p>{2}</p>


            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartamount()+2}</b>
              <hr />

            </div>
       
          </div>
          <button onClick={()=>navigate('/order')}>Procced to checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promocode , enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;