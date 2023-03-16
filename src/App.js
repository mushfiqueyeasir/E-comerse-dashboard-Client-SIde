import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layout/Layout";
import DeletedProduct from "./page/deletedProduct/DeletedProduct";
import Products from "./page/products/Products";
import SoldProducts from "./page/soldProducts/SoldProducts";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./page/addProduct/AddProduct";
import Login from "./page/login/Login";
import UserAuth from "./auth/UserAuth";
import AddProduct2 from "./page/addProduct/AddProduct2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<h2>dashbaord</h2>} />
          <Route path="products" element={<Products />} />
          <Route path="soldProduct" element={<SoldProducts />} />
          <Route path="addProduct" element={<AddProduct2 />} />
          <Route path="deletedProduct" element={<DeletedProduct />} />
          <Route path="user" element={<h2>user</h2>} />
        </Route>

        <Route
          path="/login"
          element={
            <UserAuth>
              <Login />
            </UserAuth>
          }
        ></Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
