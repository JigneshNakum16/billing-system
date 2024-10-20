import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import logo from "../../../assets/image/logo.png";
import classes from "./styles.module.scss";
import Cookies from "js-cookie";

const sidebarItems = [
  {
    id: 1,

    name: "Orders",
    slug: "/",
    icon: "",
  },
  {
    id: 2,
    name: "Food",
    slug: "/food",
    icon: "",
  },
  {
    id: 3,
    name: "Add Food",
    slug: "/addFood",
    icon: "",
  },
  {
    id: 4,
    name: "Logout",
    slug: "",
    icon: "",
  },
];

const SideBar = ({ showSidebar, handleSidebarToggle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const initialTab = sidebarItems.find((item) => {
      return item.slug === pathname;
    });
    const id = initialTab ? initialTab.id : null;
    setActiveTab(id || 1);
  }, [pathname]);

  const handleLogOut = () => {
    let result = window.confirm("Do you want to logout?");
    if (result === true) {
      if (Cookies.get("token")) {
        Cookies.remove("token");
        // navigate("/login");
        window.location.href = "/login";
      }
    }
  };

  return (
    <div
      className={cx(classes.sidebar, {
        [classes.isActive]: showSidebar,
      })}
    >
      <div
        className={cx(classes.header, { [classes.sidebarBurger]: showSidebar })}
      >
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.closeIcon} onClick={handleSidebarToggle}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div className={classes.sidebarContent}>
        {sidebarItems.map(({ id, name, slug }) => {
          return (
            <div
              key={id}
              onClick={() => {
                setActiveTab(id);
                showSidebar && handleSidebarToggle();
                if (id === 4) {
                  handleLogOut();
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
