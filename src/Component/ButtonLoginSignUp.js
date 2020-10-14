import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import SideBar from './SideBar';
import { GlobalContext } from '../Context/GlobalContext';

const ButtonLoginSignUp = () => {
  const { isLogin, setIsLogin, setLoading, token } = useContext(GlobalContext);

  const history = useHistory();

  const logout = () => {
    setIsLogin(false);
    localStorage.clear();
    history.push('/login');
  }

  return (
    <div className="btn-container">
      <SideBar />
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
        <button onClick={logout} className={isLogin ? "btn-logout" : "btn-logout hide-btn"}>Logout</button>
      </div>
    </div>
  );
};

export default ButtonLoginSignUp;
