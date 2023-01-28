import axios from "axios";
import React from "react";
import { useState } from "react";

function Label({ setDatas, gettingName, localName, children, handleSubmitSelect }) {
  const env = process.env.REACT_APP_ALL_API;
  React.useEffect(() => {
    axios
      .get(`${env}${gettingName}`)
      .then((res) => {
        window.localStorage.setItem(`${localName}`, JSON.stringify(res.data));
        setDatas(res.data);
      })
      .catch((res) => {
        window.localStorage.removeItem(`${localName}`, JSON.stringify(res.data));
      });
  }, []);
  return <form onSubmit={handleSubmitSelect}>{children}</form>;
}

export default Label;
