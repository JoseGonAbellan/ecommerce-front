import { SimpleProduct } from "../../common/types/product";
import styles from "./productPreview.module.css";

export const ProductPreview: React.FC<SimpleProduct> = ({productImageURL, productName, price}) => {
  return (
    <div className={styles.productPreview}>
      <img src={productImageURL} alt= {`Imagen del producto ${productName}`} className={styles.productPreviewImage} />
      <p>{productName}</p>
      <p>{price}</p>
    </div>
  );
}