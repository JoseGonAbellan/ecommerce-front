import { FiShoppingCart, FiUser } from "react-icons/fi";
import styles from "./header.module.css";
export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      {/* <h5>Nombre de la tienda</h5> */}
      <div className={styles.buttons}>
        <p>Productos</p>
        <p>Contacto</p>
        <p>Sobre Nosotros</p>
      </div>
      <div className={styles.icons}>
        <FiShoppingCart />
        <FiUser />
        </div>
    </div>
  );
}