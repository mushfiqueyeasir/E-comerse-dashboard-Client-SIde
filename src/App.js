import React, { createContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layout/Layout";

import SoldProducts from "./page/soldProducts/SoldProductsPage";
import Login from "./page/login/Login";
import UserAuth from "./auth/UserAuth";
import AddProduct from "./page/addProduct/AddProduct";
import RequireAuth from "./auth/RequireAuth";
import UserPage from "./page/userPage/UserPage";

import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./page/dashboard/Dashboard";
import ProductsPage from "./page/products/ProductsPage";
import useSession from "./hooks/useSession";
import useFetch from "./hooks/useFetch";
import DeletedProductPage from "./page/deletedProduct/DeletedProductPage";

export const COUNTER_CONTEXT = createContext();

function App() {
  const [user, userLoading, userRefetch] = useSession();
  const [activeProducts, activeProductsLoading, activeProductRefetch] =
    useFetch({
      api: "products/active",
    });

  const [soldProducts, soldProductsLoading, soldProductRefetch] = useFetch({
    api: "products/sold",
  });

  const [deletedProducts, deletedProductLoading, deletedProductRefetch] =
    useFetch({ api: "products/inactive" });

  const [usersList, userListLoading, usersListRefetch] = useFetch({
    api: "user/list",
  });

  if (
    userLoading ||
    activeProductsLoading ||
    soldProductsLoading ||
    deletedProductLoading ||
    userListLoading
  ) {
    return <h2>Loading....</h2>;
  }

  const value = {
    user,
    userRefetch,
    usersList,
    usersListRefetch,
    activeProducts,
    activeProductRefetch,
    soldProducts,
    soldProductRefetch,
    deletedProducts,
    deletedProductRefetch,
  };

  return (
    <>
      <COUNTER_CONTEXT.Provider value={value}>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="soldProduct" element={<SoldProducts />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="deletedProduct" element={<DeletedProductPage />} />
            <Route path="user" element={<UserPage />} />
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
      </COUNTER_CONTEXT.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
