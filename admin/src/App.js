import "./App.css";
import AuthLayout from "./layout/AuthLayout";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import RoutesList from "./router.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { isLoggedIn } from "./utils/helper";


function App() {


  const renderRoutes = () => {
    const isLogin = isLoggedIn();
    const renderRoute = (Component, layout, isPrivate) => {
      if (Component) {
        switch (layout) {
          case "private":
            return isLogin && isPrivate ? (
              <PrivateLayout>
                <Component />
              </PrivateLayout>
            ) : (
              <Navigate to="/login" />
            );
          case "auth":
            return isLogin ? (
              <Navigate to="/" />
            ) : (
              <AuthLayout>
                <Component />
              </AuthLayout>
            );
          case "public":
          default:
            return (
              <PublicLayout>
                <Component />
              </PublicLayout>
            );
        }
      }
      return null;
    };

    return RoutesList.map((route) => (
      <Route
        key={route.name}
        path={route.path}
        element={renderRoute(route.component, route.layout, route.isPrivate)}
      />
    ));
  };

  return <Routes>{renderRoutes()}</Routes>;
}

export default App;
