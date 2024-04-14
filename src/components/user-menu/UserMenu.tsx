import { Link } from "react-router-dom";
import { RolEnum } from "../../common/types/user";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { Routes } from "../../router/routes";
import styles from "./userMenu.module.css";

interface UserMenuProps{
  open: boolean
};

export const UserMenu: React.FC<UserMenuProps> = ({open}) => {
  const {setUser, user} = useUser();
  const {goHomePage} = useCustomRouter();
  const handleCloseSession = () => {
    setUser(null);
    goHomePage();
  };
  return (
    <div className={open ? styles.menu : styles.menuHidden}>
        <Link to={Routes.CONTACT_PAGE} >Contacto</Link>
        <Link to={Routes.HOME_PAGE} >Home</Link>
        {user && <Link to={Routes.USER_DETAIL_PAGE} >Mi perfil</Link>}
        {user && <p onClick={handleCloseSession}>Salir de la sesión</p>}
        {user && user.rol === RolEnum.ADMIN && <p>Panel de administrador</p>}
        
    </div>
  );
}