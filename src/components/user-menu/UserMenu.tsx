import { Link } from "react-router-dom";
import { Routes } from "../../router/routes";
import styles from "./userMenu.module.css";

interface UserMenuProps{
  open: boolean
};

export const UserMenu: React.FC<UserMenuProps> = ({open}) => {

  return (
    <div className={open ? styles.menu : styles.menuHidden}>
        <Link to={Routes.CONTACT_PAGE} >Contacto</Link>
        <Link to={Routes.HOME_PAGE} >Home</Link>
    </div>
  );
}