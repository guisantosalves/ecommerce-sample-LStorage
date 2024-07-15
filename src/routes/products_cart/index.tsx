import * as React from "react";
import ProductContext from "../../store/context_api";
import styles from "./styles.module.css";
import { Card, CardActions, CardContent } from "@mui/material";
import { useNavigate } from "react-router";
import AlertSuccess from "../../components/alert";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { relative } from "path";

function ProductCart() {
  const { state, setCart, cart } = React.useContext(ProductContext);
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);

  const increasingItems = (id: number) => {
    const cartCopy = [...cart];
    const index = cartCopy.findIndex((item) => item.id === id);

    if (index != -1) {
      cartCopy[index].qtd = cartCopy[index].qtd + 1;
    }

    setCart(cartCopy);
  };

  const decreasingItems = (id: number) => {
    const cartCopy = [...cart];
    const index = cartCopy.findIndex((item) => item.id === id);

    if (index != -1) {
      cartCopy[index].qtd = cartCopy[index].qtd - 1;
    }

    if (cartCopy[index].qtd <= 0) {
      cartCopy.splice(index, 1);
    }

    setCart(cartCopy);
  };

  const removeBtn = (id: number) => {
    const cartCopy = [...cart];
    const index = cartCopy.findIndex((item) => item.id === id);

    cartCopy.splice(index, 1);

    setCart(cartCopy);
  };

  const calcTotalValue = (): number => {
    let result = 0;

    cart.forEach((item) => {
      result = result + item.preco * item.qtd;
    });

    return result;
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
        <span style={{ marginRight: "1rem" }}>Carrinho</span>
      </div>
      <div className={`${styles.bodyContainer}`}>
        <div className={styles.container}>
          {cart.map((product) => {
            return (
              <div style={{ position: "relative" }} key={product.id}>
                <CancelIcon
                  onClick={() => removeBtn(product.id)}
                  className={styles.closeIcon}
                />
                <Card className={styles.card}>
                  <CardContent>
                    <div className={styles.cardHeader}>
                      <h2>{product.nome}</h2>
                      <p>R$ {product.preco}</p>
                    </div>
                  </CardContent>
                  <CardActions className={styles.cardActios}>
                    <div className={styles.containerPlusMinus}>
                      <AddCircleIcon
                        onClick={() => increasingItems(product.id)}
                        className={styles.iconPlusMinus}
                      />
                      -
                      <RemoveCircleIcon
                        onClick={() => decreasingItems(product.id)}
                        className={styles.iconPlusMinus}
                      />
                    </div>
                    <div
                      style={{ marginRight: 10 }}
                    >{`Quantidade: ${product.qtd}`}</div>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
        <div>
          <span
            style={{ fontSize: 35 }}
          >{`Valor total: ${calcTotalValue().toString()}`}</span>
        </div>
      </div>

      <AlertSuccess
        open={openSuccess}
        setOpen={setOpenSuccess}
        label="Inserido no carrinho com sucesso"
      />
    </div>
  );
}

export default ProductCart;
