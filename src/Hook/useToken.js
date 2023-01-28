import { useContext } from "react";
import { Context } from "../Context/Context";

const useToken = () => {
  const ctx = useContext(Context);
  return [ctx.token, ctx.setToken];
};

export default useToken;
