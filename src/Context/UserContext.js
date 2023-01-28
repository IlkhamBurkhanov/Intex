import { createContext, useState } from "react";

const Context = createContext();

const UserContext = ({ children }) => {
  const [users, setUsers] = useState();

  return <Context.Provider value={{ users, setUsers }}>{children}</Context.Provider>;
};

export { Context, UserContext };
