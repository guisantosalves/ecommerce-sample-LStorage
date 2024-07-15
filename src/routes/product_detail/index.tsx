import * as React from "react";
import styles from "./styles.module.css";
import AlertSuccess from "../../components/alert";
import { useNavigate, useParams } from "react-router";
import ProductContext from "../../store/context_api";
import { Card, CardActions, CardContent } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

function ProductDetail() {
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const { product_id } = useParams();
  const { state, setCart, cart } = React.useContext(ProductContext);
  const [currentProduct, setCurrentProduct] = React.useState<ProductState>(
    {} as ProductState
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    // the same of the parameters
    if (!product_id) return;
    const index = state.findIndex((item) => item.id.toString() === product_id);
    if (index != -1) {
      setCurrentProduct(state[index]);
    }
  }, []);

  const handleAddIntoCart = (product: ProductState) => {
    const gettingIndex = cart.findIndex((item) => item.id === product.id);
    if (gettingIndex != -1) {
      // when it exists into cart
      const copyCart = [...cart];
      copyCart[gettingIndex].qtd = copyCart[gettingIndex].qtd + 1;
      setCart(copyCart);
    } else {
      // when it does not exist
      const newOne: Cart = {
        id: product.id,
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco,
        qtd: 1,
      };
      setCart((currVal) => [...currVal, newOne]);
    }
    setOpenSuccess(true);
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.headerContainer}`}>
        <HomeIcon
          style={{ marginLeft: "1rem", fontSize: 45, cursor: "pointer" }}
          onClick={() => {
            navigate("/products/list");
          }}
        />
        <span style={{ marginRight: "1rem" }}>Detalhes</span>
      </div>
      <div className={`${styles.bodyContainer}`}>
        {currentProduct.id ? (
          <div>
            {" "}
            <Card className={styles.card}>
              <CardContent>
                <div className={styles.cardHeader}>
                  <h2>{currentProduct.nome}</h2>
                  <p>R$ {currentProduct.preco}</p>
                </div>
                <div>{currentProduct.descricao}</div>
              </CardContent>
              <CardActions>
                <AddShoppingCartIcon
                  className={`${styles.icon}`}
                  onClick={() => handleAddIntoCart(currentProduct)}
                />
              </CardActions>
            </Card>
          </div>
        ) : (
          <div>Produto não encontrado!!</div>
        )}
      </div>

      <AlertSuccess
        open={openSuccess}
        setOpen={setOpenSuccess}
        label="Inserido no carrinho com sucesso"
      />
    </div>
  );
}

export default ProductDetail;
