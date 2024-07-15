export const productSave = (products: ProductState[]): void => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const getProducts = (): ProductState[] => {
  const items = localStorage.getItem("products");
  if (!items) return [];
  return JSON.parse(items) as ProductState[];
};

export const cartSave = (cart: Cart[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = (): Cart[] => {
  const items = localStorage.getItem("cart");
  if (!items) return [];
  return JSON.parse(items) as Cart[];
};
