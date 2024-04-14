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
      <div className={styles.logo} onClick={goHomePage}>
        <img src={process.env.PUBLIC_URL + '/images/logoTienda.png'} className={styles.logoImage} />
      </div>
      {/* <h5>Nombre de la tienda</h5> */}
      <div className={styles.buttons}>
        <Link to={Routes.PRODUCTS_PAGE} className={styles.links}>Productos</Link>
        <Link to={Routes.CONTACT_PAGE} className={styles.links}>Contacto</Link>
        <p>Sobre Nosotros</p>
      </div>
      <div className={styles.icons}>
        <FiShoppingCart />
        <div>
          <FiUser onClick={() => setOpenUserMenu(!openUserMenu)}/>
          {user ? <p>Bienvenido {user.userName}</p> : <Link to={Routes.LOGIN_PAGE}>Login</Link>}
          
        </div>
        </div>
        <UserMenu open={openUserMenu}/>
    </div>
  );
}