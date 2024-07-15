import * as React from "react";
import ProductContext from "../../store/context_api";
import styles from "./styles.module.css";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import LoupeIcon from "@mui/icons-material/Loupe";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router";
import AlertSuccess from "../../components/alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getProducts, productSave } from "../../store/local_storage";
import { itemsParaCompra } from "../../utils/utils";

if (getProducts().length === 0) {
  // insert and reload page
  productSave(itemsParaCompra as ProductState[]);
  // window.location.reload();
}

function ProductList() {
  const { state, setCart, cart } = React.useContext(ProductContext);
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);

  const handleOpenDetail = (id: number) => {
    navigate(`/products/detail/${id}`);
  };

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
        {" "}
        <ShoppingCartIcon
          style={{ marginLeft: "1rem", fontSize: 45, cursor: "pointer" }}
          onClick={() => {
            navigate("/products/cart");
          }}
        />
        <span style={{ marginRight: "1rem" }}>Lista de Produtos</span>
      </div>
      <div className={`${styles.bodyContainer}`}>
        <div className={`${styles.table}`}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>identificador</TableCell>
                  <TableCell align="right">Nome</TableCell>
                  <TableCell align="right">preço</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.id}
                    </TableCell>
                    <TableCell align="right">{product.nome}</TableCell>
                    <TableCell align="right">{product.preco}</TableCell>
                    <TableCell align="right">
                      <LoupeIcon
                        className={`${styles.icon}`}
                        onClick={() => handleOpenDetail(product.id)}
                      />
                      <AddShoppingCartIcon
                        className={`${styles.icon}`}
                        onClick={() => handleAddIntoCart(product)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ProductList;
