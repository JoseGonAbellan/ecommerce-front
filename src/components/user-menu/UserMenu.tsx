import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RolEnum } from "../../common/types/user";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { Routes } from "../../router/routes";
import styles from "./userMenu.module.css";

interface UserMenuProps {
  open: boolean;
  onClose: () => void;
};

export const UserMenu: React.FC<UserMenuProps> = ({ open, onClose }) => {
  const { setUser, user } = useUser();
  const { goHomePage, goAdminPage } = useCustomRouter();

  const handleCloseSession = () => {
    localStorage.removeItem('user');
    setUser(null);
    goHomePage();
  };

  // Cerrar el Menú de usuario cuando se hace click en cualquier otro sitio de la página. 

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Función para cerrar el menú si se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Se añade el evento manejador de clikc cuando el menú está abierto
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Eliminar el manejador de clic cuando el menú se cierra
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpiar el manejador de clic cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div className={open ? styles.menu : styles.menuHidden} ref={menuRef}>
      <Link to={Routes.CONTACT_PAGE} >Contacto</Link>
      <Link to={Routes.HOME_PAGE} >Home</Link>
      {user && <Link to={Routes.USER_DETAIL_PAGE} >Mi perfil</Link>}
      {user && user.rol === RolEnum.ADMIN && <Link to={Routes.ADMIN_PAGE}>Panel de administrador</Link>}
      {user && <p className={styles.logOut}onClick={handleCloseSession}>Salir de la sesión</p>}


    </div>
  );
}