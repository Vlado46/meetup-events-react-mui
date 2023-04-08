import { createContext } from "react";

const UserCtx = createContext({
  isLoggedIn: "",
  setIsLoggedIn: () => {},
});
export default UserCtx;
