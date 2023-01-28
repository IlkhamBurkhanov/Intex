import { Routes, Route } from "react-router-dom";
import SiteBar from "./components/Sitebar/SiteBar";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Catergory from "./Pages/Category/Category";
import Atribut from "./Pages/Atribut/Atribut";
import Order from "./Pages/Order/Order";
import CallBack from "./Pages/CallBack/CallBack";
import Settings from "./Pages/Settings/Settings";
import AddProduct from "./Pages/AddProduct/NewProductPage";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddAtribut from "./Pages/AddAtribut/AddAtribut";
import UserPage from "./Pages/UserPage/UserPage";
import NotFound from "./Pages/NotFound/NotFound";
import "./Assets/main.css";
import UserDetails from "./Pages/UserDetails/UserDetails";
import { UpdateOrder } from "./Pages/Order/UpdateOrder";

export default function Authentication() {
  return (
    <>
      <div className="flex">
        <SiteBar />
        <div className="w-full overflow-x-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Catergory />} />
            <Route path="/atribut" element={<Atribut />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/update" element={<UpdateOrder />} />
            <Route path="/callBack" element={<CallBack />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/addAtribut" element={<AddAtribut />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
