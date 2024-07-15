import * as React from "react";
import { Outlet } from "react-router-dom";
import { ProductContextProvider } from "../../store/context_api";
import { getCart, getProducts } from "../../store/local_storage";

const MyContextLayout = () => {
  return (
    <ProductContextProvider
      cartInitial={getCart()}
      stateInitial={getProducts()}
    >
      <Outlet />
    </ProductContextProvider>
  );
};

export default MyContextLayout;
