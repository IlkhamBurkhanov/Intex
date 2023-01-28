import { useContext } from "react";
import { Context } from "../Context/UserContext";

const useAdmins = () => {
  const ctx = useContext(Context);
  return [ctx.users, ctx.setUsers];
};

export default useAdmins;
