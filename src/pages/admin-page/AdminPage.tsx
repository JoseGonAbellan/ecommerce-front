import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateJWT, secretKey } from '../../common/jwt/generate-jwt';
import { Product } from '../../common/types/product';
import { RolEnum } from '../../common/types/user';
import { useUser } from '../../context/user-context';
import { useCustomRouter } from '../../router/custom-router';
import { Routes } from '../../router/routes';
import { deleteProduct, getAllProducts } from '../../services/product-service';
export const AdminPage = () => {
  const { user } = useUser();
  const { goCreateProduct } = useCustomRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [existNextPage, setExistNextPage] = useState<boolean>(true);
  const token = generateJWT(user, secretKey);


  const handleDeleteProduct = (id: number) => {
    deleteProduct(id, token);
  }

  const handleNextPage = () => {
    if (existNextPage) {
      setCurrentPage(currentPage + 1)
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  };


  useEffect(() => {
    if (user)
      getAllProducts({ pageSize: 5, page: currentPage }).then((response) => {
        if (response.length !== 0) {
          setProducts(response)
          setExistNextPage(true)
        } else {
          setExistNextPage(false)
        }
      });
  }, [currentPage, handleDeleteProduct]);


  if (user?.rol !== RolEnum.ADMIN) {
    return <div style={{ padding: 200 }}>No tienes permisos para ver esta página</div>
  }

  return (
    <div style={{ padding: 200 }}>
      <Link to={Routes.CREATE_PRODUCT}>Crear un nuevo producto</Link>
      <Link to={Routes.ORDERS_LIST}>Cambiar el estado de un pedido</Link>
      <div>
        <h2>Eliminar un producto</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productID}>
                <td>{product.productID}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>
                  <div>
                    <button onClick={() => handleDeleteProduct(product.productID)}>Eliminar</button>
                    <button onClick={() => goCreateProduct(product.productID)}>Editar producto producto</button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
        <button onClick={handleNextPage} disabled={!existNextPage}>Página siguiente</button>
      </div>
    </div>
  );
}