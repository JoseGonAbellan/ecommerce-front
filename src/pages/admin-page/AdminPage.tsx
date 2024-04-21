import { FiEdit2, FiFilePlus, FiTrash2 } from "react-icons/fi";
import { RolEnum } from '../../common/types/user';
import { useUser } from '../../context/user-context';
import { useCustomRouter } from '../../router/custom-router';
import styles from "./adminPage.module.css";

export const AdminPage = () => {
  const { user } = useUser();
  const { goCreateProduct, goOrderList, goDeleteProducts } = useCustomRouter();




  if (user?.rol !== RolEnum.ADMIN) {
    return <div>No tienes permisos para ver esta página</div>
  }

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminPageSections} onClick={() => goCreateProduct()}>
        <FiFilePlus className={styles.iconsAdmin} />
        <p>Crear un nuevo producto</p>
      </div>
      <div className={styles.adminPageSections} onClick={() => goOrderList()}>
        <FiEdit2 className={styles.iconsAdmin} />
        <p>Cambiar el estado de un pedido</p>
      </div>
      <div className={styles.adminPageSections} onClick={() => goDeleteProducts()}>
        <FiTrash2 className={styles.iconsAdmin} />
        <p>Eliminar productos</p>
      </div>
    </div>
  );
}