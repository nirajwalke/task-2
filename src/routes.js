import Login from "../components/login/index";
import Register from "../components/register/index";
import Home from "../components/home/index";
export const routes = [
  {
    path: "/",
    exact: true,
    name: "Login",
    component: Login,
  },
  {
    path: "/login",
    // exact: true,
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];
