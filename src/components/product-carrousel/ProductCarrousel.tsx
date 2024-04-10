import { SimpleProduct } from "../../common/types/product";
import { ProductPreview } from "../product-preview/ProductPreview";
import styles from "./ProductCarrousel.module.css";
interface ProductCarrouselProps{
  products: SimpleProduct[];
  title: string;
}

export const ProductCarrousel: React.FC<ProductCarrouselProps> = ({products, title}) => {
  return (
    <div className={styles.carrouselArea}> 
      <h2>{title}</h2>
      <div className= {styles.productCarrousel}>
      {products.map((product)=>{
        return <ProductPreview productImageURL={product.productImageURL} productName={product.productName} price={product.price} productID={product.productID} key={product.productID} />
      })}
      </div>
    </div>
  );
}