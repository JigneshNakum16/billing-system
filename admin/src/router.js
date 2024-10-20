import AddFood from "./pages/AddFood";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/SignUp";
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
    name: "Orders",
    component: Order,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/food",
    name: "Food",
    component: Food,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/addFood",
    name: "AddFood",
    component: AddFood,
    isPrivate: true,
    layout: "private",
  },
];

export default routes;
