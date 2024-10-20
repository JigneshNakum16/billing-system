import cs from "classnames";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../utils/useWindowSize.js";
import Header from "./Header";
import Sidebar from "./SideBar";
import classes from "./styles.module.scss";
import FooterLayout from "./Footer/index.jsx";

const PrivateLayout = (props) => {
  const { width = 0 } = useWindowSize();
  const isMobile = width < 768;
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => setShowSidebar(true);

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
