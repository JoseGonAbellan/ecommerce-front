import { useEffect, useState } from "react";
import { Product, ProductType } from "../../common/types/product";
import { CategoryButton } from "../../components/category-button/Category-button";
import { ProductCarrousel } from "../../components/product-carrousel/ProductCarrousel";
import { getAllProducts } from "../../services/product-service";
import styles from "./home.module.css";
import { useCustomRouter } from "../../router/custom-router";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {goProductsPage} = useCustomRouter();

  useEffect(() => {
    getAllProducts().then((response) => setProducts(response));
  },[]);

  return (
    <div style={{padding: 200}} className= {styles.home}>
      <ProductCarrousel products={products} title="Últimas Novedades"/>
      <div className={styles.categoriesButtons}>
        <CategoryButton title="Juegos de Mesa" color="#9EB384" iconUrl='/images/bg-icon.png' onClick={() => goProductsPage(ProductType.BOARD_GAMES)}/>
        <CategoryButton title="Juegos de Cartas" color="#435334" iconUrl='/images/cg-icon.png' onClick={() => goProductsPage(ProductType.CARD_GAMES)}/>
        <CategoryButton title="Juegos de Rol" color="#9EB384" iconUrl='/images/rg-icon.png' onClick={() => goProductsPage(ProductType.ROLE_GAMES)}/>
        <CategoryButton title="Merchandising" color="#435334" iconUrl='/images/merchan-icon.png' onClick={() => goProductsPage(ProductType.MERCHANDISING)}/>
      </div>
    </div>
  );
}