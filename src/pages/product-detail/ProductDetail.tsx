import { useParams } from "react-router-dom";
import styles from "./productDetail.module.css";
import { useEffect, useState } from "react";
import { Product } from "../../common/types/product";
import { getProductById } from "../../services/product-service";


export const ProductDetail = () => {
  const [product, setProduct] = useState<Product>();
    const {id} = useParams();

  useEffect(() => {
    if(id){
    getProductById(parseInt(id)).then((response) => setProduct(response));
    }
  },[id]); 
  if(!product){
    return <div className={styles.container}>El producto no existe</div>
  } 
  return (
    <div className= {styles.container}>
        <h1>{product?.productName}</h1>
        <div className={styles.productDetail}>
          <img src={product?.productImageURL} className={styles.productImage}/>
          <div className={styles.detailsContainer}>
          <h4>Descripción</h4>
          <p>{product?.productDescription}</p>
          <h4>Detalles del Producto</h4>
          <p>Precio: {product?.price} €</p>
          <p>Stock: {product?.stock}</p>
          <p>Categoría: {product?.productType}</p>
          <button disabled={product?.stock === 0}>Añadir al carrito</button>
          </div>
        </div>
       
        
    </div>
  );
}