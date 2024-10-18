import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import Order from "./pages/Order";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/addFood",
    name: "AddFood",
    component: Food,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/orders",
    name: "Orders",
    component: Order,
    isPrivate: true,
    layout: "private",
  },
];

export default routes;
