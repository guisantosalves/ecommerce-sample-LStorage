import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductList from "./routes/product_list";
import ProductDetail from "./routes/product_detail";
import ProductCart from "./routes/products_cart";
import MyContextLayout from "./routes/wrapper";
import { getProducts, productSave } from "./store/local_storage";
import { itemsParaCompra } from "./utils/utils";

function AppRoutes() {
  // saving into LStorage the standart items

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"products/list"} />} />
        <Route path="products" element={<MyContextLayout />}>
          <Route path="list" element={<ProductList />} />
          <Route path="detail/:product_id" element={<ProductDetail />} />
          <Route path="cart" element={<ProductCart />} />
        </Route>
        <Route path="/*" element={<Navigate replace to="products/list" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
