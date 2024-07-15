import React, { createContext, useEffect, useState } from "react";
import { cartSave, productSave } from "../local_storage";

const DEFAULT_VALUE: PropsProductContext = {
  state: [],
  setState: () => [],
  cart: [],
  setCart: () => [],
};

// creating my context
const ProductContext = createContext<PropsProductContext>(DEFAULT_VALUE);

interface Props {
  children: React.ReactNode;
  stateInitial: ProductState[];
  cartInitial: Cart[];
}

const ProductContextProvider: React.FC<Props> = ({
  children,
  stateInitial,
  cartInitial,
}) => {
  const [state, setState] = React.useState(stateInitial);
  const [cart, setCart] = React.useState(cartInitial);

  useEffect(() => {
    productSave(state);
  }, [state]);

  useEffect(() => {
    cartSave(cart);
  }, [cart]);

  return (
    <ProductContext.Provider
      value={{
        state,
        setState,
        cart,
        setCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider };
export default ProductContext;
