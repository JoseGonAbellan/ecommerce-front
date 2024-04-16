import { FiShoppingCart, FiUser } from "react-icons/fi";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { Routes } from "../../router/routes";
import { useCustomRouter } from "../../router/custom-router";
import { useState } from "react";
import { UserMenu } from "../user-menu/UserMenu";
import { useUser } from "../../context/user-context";
export const Header = () => {
const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
const {goHomePage} = useCustomRouter();
const {user} = useUser();
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={process.env.PUBLIC_URL + '/images/logoTienda.png'} className={styles.logoImage} onClick={goHomePage}/>
      </div>
      <div className={styles.buttons}>
        <Link to={Routes.PRODUCTS_PAGE} className={styles.links}>Productos</Link>
        <Link to={Routes.CONTACT_PAGE} className={styles.links}>Contacto</Link>
        <p>Sobre Nosotros</p>
      </div>
      <div className={styles.iconsArea}>
        <FiShoppingCart className={styles.icons}/>
        <FiUser className={styles.icons} onClick={() => setOpenUserMenu(!openUserMenu)}/>
        {user ? <p className={styles.userButton}>Hola {user.userName}!</p> : <Link to={Routes.LOGIN_PAGE} className={styles.loginButton}>Login</Link>}
      </div>
        <UserMenu open={openUserMenu}/>
    </div>
  );
}