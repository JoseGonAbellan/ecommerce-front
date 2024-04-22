import { useState } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { Routes } from "../../router/routes";
import { ShoppingCart } from "../shopping-cart/ShoppingCart";
import { UserMenu } from "../user-menu/UserMenu";
import styles from "./header.module.css";
export const Header = () => {
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const { goHomePage } = useCustomRouter();
  const { user } = useUser();

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };


  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={process.env.PUBLIC_URL + '/images/logoTienda.png'} className={styles.logoImage} onClick={goHomePage} />
      </div>
      <div className={styles.buttons}>
        <Link to={Routes.PRODUCTS_PAGE} className={styles.links}>Productos</Link>
        <Link to={Routes.CONTACT_PAGE} className={styles.links}>Contacto</Link>
      </div>
      <div className={styles.iconsArea}>
        <FiShoppingCart className={styles.icons} onClick={() => setOpenCart(!openCart)} />
        <FiUser className={styles.icons} onClick={() => setOpenUserMenu(!openUserMenu)} />
        {user ? <p className={styles.userButton}>Hola {user.userName}!</p> : <Link to={Routes.LOGIN_PAGE} className={styles.loginButton}>Login</Link>}
      </div>
      <UserMenu open={openUserMenu} onClose={handleCloseUserMenu} />
      <ShoppingCart open={openCart} onClose={handleCloseCart} />
    </div>
  );
}