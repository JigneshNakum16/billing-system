import cx from "classnames";
// import get from "lodash/get";
import React, { useState } from "react";
import { useNavigate } from "react-router";
// import { useLocation } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close-icon.svg";
import classes from "./styles.module.scss";

const sidebarItems = [
  {
    id: 1,
    name: "Add Food",
    slug: "/addFood",
    icon: "",
  },
  {
    id: 2,
    name: "Orders",
    slug: "/orders",
    icon: "",
  },
  {
    id: 3,
    name: "Logout",
    slug: "",
    icon: "",
  },
];

const SideBar = ({ showSidebar, handleSidebarToggle }) => {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  // const { role } = get(data, "user", {});

  // useEffect(() => {
  //   const initialTab = sidebarItems.find((item) => {
  //     return item.slug === pathname;
  //   });
  //   const id = initialTab ? initialTab.id : null;
  //   setActiveTab(id || 1);
  // }, [pathname]);

  return (
    <div
      className={cx(classes.sidebar, {
        [classes.isActive]: showSidebar,
      })}
    >
      <div
        className={cx(classes.header, { [classes.sidebarBurger]: showSidebar })}
      >
        <div className={classes.logo}>logo</div>
        <div className={classes.closeIcon} onClick={handleSidebarToggle}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div className={classes.sidebarContent}>
        {sidebarItems.map(({ id, name, icon, slug }) => {
          return (
            <div
              key={id}
              onClick={() => {
                setActiveTab(id);
                showSidebar && handleSidebarToggle();
                if (id === 3) {
                  setOpenFormModal(!openFormModal);
                  return;
                }
                navigate(`${slug}`);
              }}
              className={cx(classes.sidebarItem, {
                [classes.active]: id === activeTab,
              })}
            >
              <span className={classes.itemNames}>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
