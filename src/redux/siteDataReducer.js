import { createSlice } from "@reduxjs/toolkit";
import languages from "./localization.js";
const siteProducts = createSlice({
  name: "products",
  initialState: {
    localization: languages,
    lang: "ru",
    search: "",
    userId: 0,
    orderNum: "",
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },

    searchProduction: (state, action) => {
      state.search = action.payload;
    },
    changeUserID: (state, action) => {
      state.userId = action.payload;
    },
    changeOrderNum: (state, action) => {
      state.orderNum = action.payload;
    },
  },
});

export const { changeLang, searchProduction, changeUserID, changeOrderNum } =
  siteProducts.actions;

export default siteProducts.reducer;
