import { useEffect, useState } from "react";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { Product } from "../../common/types/product";
import { RolEnum } from "../../common/types/user";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { deleteProduct, getAllProducts } from "../../services/product-service";
import styles from "./productAdmin.module.css";

export const ProductAdminList = () => {

    const { user } = useUser();
    const { goCreateProduct } = useCustomRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [existNextPage, setExistNextPage] = useState<boolean>(true);

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


    const token = generateJWT(user, secretKey);


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
        return <div>No tienes permisos para ver esta página</div>
    };

    return (
        <div>
            <h2>Lista de todos los productos</h2>
            <table >
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
                            <td className={styles.actionButtonsTable}>
                                <button className={styles.actionButtons} onClick={() => handleDeleteProduct(product.productID)}>Eliminar</button>
                                <button className={styles.actionButtons} onClick={() => goCreateProduct(product.productID)}>Editar producto</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.myOrdersPagContainer}>
                <button className={styles.paginationButtons} onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
                <button className={styles.paginationButtons} onClick={handleNextPage} disabled={!existNextPage}>Página siguiente</button>
            </div>

        </div>
    )
}