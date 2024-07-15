interface ProductState {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

interface Cart {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  qtd: number;
}

interface PropsProductContext {
  state: ProductState[];
  setState: React.Dispatch<React.SetStateAction<ProductState[]>>;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
}
