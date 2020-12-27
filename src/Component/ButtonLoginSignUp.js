import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import SideBar from './SideBar';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { GlobalContext } from '../Context/GlobalContext';

const ButtonLoginSignUp = () => {
  const { isLogin, logout, setQty, qty } = useContext(GlobalContext);

  const history = useHistory();

  let cartQty = JSON.parse(localStorage.getItem('purchaseItem'))
  let tempQty = 0

  if (cartQty !== null) {
    cartQty.map(i => {
      tempQty += i.qty;
    })
  }
  setQty(tempQty)

  return (
    <div className="btn-container">
      {isLogin ? <SideBar /> : <div></div>}
      <div className="btn-checkout">
        <Link to="/checkout">
          <ShoppingCartOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
          My Items ( {qty} )
        </Link>
      </div>
      <div className="btn">
        <Link to="/login">
          <button className={isLogin ? "btn-login hide-btn" : "btn-login"}>Login</button>
        </Link>
      </div>
      <div className="btn">
        <Link to="/signup">
          <button className={isLogin ? "btn-signup hide-btn" : "btn-signup"}>Sign Up</button>
        </Link>
      </div>
      <div className="btn">
        <button onClick={() => logout(history)} className={isLogin ? "btn-logout" : "btn-logout hide-btn"}>Logout</button>
      </div>
    </div>
  );
};

export default ButtonLoginSignUp;
