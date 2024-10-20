import React from "react";
import classes from "./styles.module.scss";

const Header = ({ openSidebar }) => {
  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.burger}>
          <i className="fa-solid fa-bars" onClick={openSidebar}></i>
        </div>
        <div className={classes.title}>
          <h5>Food shop billing system</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
