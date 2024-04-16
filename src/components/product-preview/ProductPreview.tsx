import { SimpleProduct } from "../../common/types/product";
import { useCustomRouter } from "../../router/custom-router";
import styles from "./productPreview.module.css";

export const ProductPreview: React.FC<SimpleProduct> = ({productImageURL, productName, price, productID}) => {
  const {goProductDetailPage} = useCustomRouter()
  return (
    <div className={styles.productPreview} onClick={() => goProductDetailPage(productID)}>
      <img src={productImageURL} alt= {`Imagen del producto ${productName}`} className={styles.productPreviewImage} />
      <p className={styles.productName}>{productName}</p>
      <p className={styles.price}>{price} €</p>
    </div>
  );
}