import Cookies from "js-cookie"

export const isLoggedIn = () => {
    const token = Cookies.get("token");
    // const token = localStorage.getItem("token");
    return !!token;
}