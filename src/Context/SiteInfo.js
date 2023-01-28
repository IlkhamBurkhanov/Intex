import { createContext, useEffect, useState } from "react";
import axios from "axios";

const env = process.env.REACT_APP_ALL_API;

const SiteInfoContext = createContext();

const SiteInfo = ({ children }) => {
  const [siteInfo, setSiteInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${env}sites`)
      .then((res) => setSiteInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SiteInfoContext.Provider value={{ siteInfo, setSiteInfo }}>
      {children}
    </SiteInfoContext.Provider>
  );
};

export { SiteInfoContext, SiteInfo };
