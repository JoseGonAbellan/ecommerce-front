import { useEffect, useState } from "react";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { OrderPropierties } from "../../common/types/order";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { getAllOrders } from "../../services/orders-service";
import styles from "./orderList.module.css";

export const OrderList = () => {

    const { user } = useUser();
    const { goOrderDetail } = useCustomRouter();
    const [orders, setOrders] = useState<OrderPropierties[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [orderId, setOrderId] = useState<string>("");
    const [existNextPage, setExistNextPage] = useState<boolean>(true);


    const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderId(e.target.value);
    };

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
        const token = generateJWT(user, secretKey);
        getAllOrders({
            token,
            filters: {
                orderId: parseInt(orderId),
                page: currentPage,
                pageSize: 10
            }
        }).then((response) => {
            if (response.length !== 0) {
                setOrders(response);
                setExistNextPage(true);
            } else {
                setExistNextPage(false)
            }

        })
    }, [orderId, currentPage])


    return (
        <div className={styles.orderListContainer}>
            <h2>Listado de todos los pedidos de la plataforma</h2>
            <input
                type="text"
                placeholder="Filtrar por la id del pedido"
                value={orderId}
                onChange={handleOrderIdChange}
            />
            <ul>
                {orders?.map((order) => (
                    <li className={styles.orderElement} key={order.orderId} onClick={() => goOrderDetail(order.orderId as number)}>
                        <p>Pedido ID: {order.orderId}</p>
                        <p>Estado: {order.orderStatus}</p>
                        <p>Usuario ID: {order.userId}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.paginationContainer}>
                <button className={styles.buttonPaginationOrder} onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
                <button className={styles.buttonPaginationOrder}  onClick={handleNextPage} disabled={!existNextPage}>Página siguiente</button>
            </div>
        </div>
    )

}