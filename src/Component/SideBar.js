import React, { useState, useContext } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import { GlobalContext } from "../Context/GlobalContext";

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { isLogin } = useContext(GlobalContext);
  const showSideBar = () => setSidebar((prevState) => !prevState);

  console.log("isLogin: ", isLogin);

  return (
    <>
      <div className="sidebar">
        <Link to="#" className="menu-bars">
          <MenuOutlined
            onClick={showSideBar}
            className={isLogin ? "icon" : "icon hide-icon"}
          />
        </Link>
      </div>
      <nav className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
        <ul className="sidebar-menu-items" onClick={showSideBar}>
          <li className="sidebar-toggle">
            <Link to="#" className="menu-bars">
              <CloseOutlined />
            </Link>
          </li>
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
