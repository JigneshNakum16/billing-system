import cs from "classnames";
// import get from "lodash/get";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import { useWindowSize } from "../../utils/useWindowSize.js";
import { isLoggedIn } from "../../utils/helper.js";
import Header from "./Header";
import Sidebar from "./SideBar";
import classes from "./styles.module.scss";
import FooterLayout from "./Footer/index.jsx";

const PrivateLayout = (props) => {
  const isLogin = isLoggedIn();
  // const { pathname } = useLocation();
  const { width = 0 } = useWindowSize();
  const isMobile = width < 768;
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  const openSidebar = () => setShowSidebar(true);
  // const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  useEffect(() => {
    if (!isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <div className={classes.container}>
      <Sidebar
        showSidebar={showSidebar}
        handleSidebarToggle={handleSidebarToggle}
      />
      <div
        className={cs(classes.mainContainer, {
          [classes.hideContainer]: showSidebar,
        })}
      >
        <Header showSidebar={showSidebar} openSidebar={openSidebar} />
        <div className={classes.content} id="scrollView">
          {props.children}
          <FooterLayout />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
