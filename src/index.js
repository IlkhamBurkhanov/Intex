import App from "./App";
import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TokentContext } from "./Context/Context";
import { SiteInfo } from "./Context/SiteInfo";
import { UserContext } from "./Context/UserContext";
// ------> css
import "./Assets/main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <TokentContext>
        <SiteInfo>
          <UserContext>
            <App />
          </UserContext>
        </SiteInfo>
      </TokentContext>
    </Provider>
  </BrowserRouter>
);
