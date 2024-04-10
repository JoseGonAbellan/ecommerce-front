import { useEffect, useState } from "react";
import { Product } from "../common/types/product";
import { getAllProducts } from "../services/product-service";
import { ProductCarrousel } from "../components/product-carrousel/ProductCarrousel";
import styles from "./home.module.css";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((response) => setProducts(response));
  },[]);

  return (
    <div style={{padding: 200}} className= {styles.home}>
      <ProductCarrousel products={products} title="Últimas Novedades"/>
    </div>
  );
}