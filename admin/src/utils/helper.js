import Cookies from "js-cookie";

export const isLoggedIn = () => {
    const token = Cookies.get("token");
    return !!token;
}

// import React, { useEffect, useState } from "react";

// const isLoggedIn = () => {
//   const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     setIsLogin(!!token); 
//   }, []); 

//   return (
//     <div>
//       {isLogin ? (
//         <h1>Welcome back, you are logged in!</h1>
//       ) : (
//         <h1>Please log in to continue.</h1>
//       )}
//     </div>
//   );
// };

// export default isLoggedIn;
