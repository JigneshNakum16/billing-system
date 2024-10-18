import cs from "classnames";
import React from "react";
import { useNavigate } from "react-router";
import classes from "./styles.module.scss";
import Cookies from "js-cookie";

const Header = ({ openSidebar }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.burger}>
          <i className="fa-solid fa-bars" onClick={openSidebar}></i>
        </div>
        <div className={classes.getStartBtn}>
          <i
            className={cs("fa-solid fa-right-from-bracket", classes.logoutBtn)}
            onClick={handleLogOut}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
