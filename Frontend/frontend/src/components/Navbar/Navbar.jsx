import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { StoreContext } from '../../context/storecontext';

const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("menu");
  const {getTotalCartamount, token , setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")


  }

  return (
    <div className="navbar">
   <Link to='/'>   <img className="logo" src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li>
        <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartamount()===0?"":"dot"}></div>
        </div>
        {!token?  <button onClick={() => setShowlogin(true)}>Sign In</button>
        : <div className='navabr-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li> <img src={assets.bag_icon} alt="" /><p>Orders</p> </li>
              <hr />
              <li onClick={logout} > <img src={assets.logout_icon} alt="" /><p>Logout</p></li>
       
          </ul>

        </div>
        }
      
      </div>
    </div>
  );
};

export default Navbar;