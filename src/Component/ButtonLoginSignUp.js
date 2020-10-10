import React from "react";
import { Link } from "react-router-dom";

const ButtonLoginSignUp = () => {
  return (
    <div className="btn-container">
      <div className="btn">
        <Link to="/login">
          <button className="btn-login">Login</button>
        </Link>
      </div>
      <div className="btn">
        <Link to="/signup">
          <button className="btn-signup">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonLoginSignUp;
