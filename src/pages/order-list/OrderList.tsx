import { useEffect, useState } from "react";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { OrderPropierties } from "../../common/types/order";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { getAllOrders } from "../../services/orders-service";

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
                pageSize: 15
            }
        }).then((response) => {
            if (response.length !== 0) {
                setOrders(response);
                setExistNextPage(true);
            } else {
                setExistNextPage(false)
            }

        })
    }, [orderId])


    return (
        <div style={{ padding: 200 }}>
            <h2>Listado de todos los pedidos de la plataforma</h2>
            <input
                type="text"
                placeholder="Filtrar por la id del pedido"
                value={orderId}
                onChange={handleOrderIdChange}
            />
            <ul>
                {orders?.map((order) => (
                    <li key={order.orderId} onClick={() => goOrderDetail(order.orderId as number)}>
                        Pedido ID: {order.orderId}, Estado: {order.orderStatus}, Usuario ID: {order.userId}
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
                <button onClick={handleNextPage} disabled={!existNextPage}>Página siguiente</button>
            </div>
        </div>
    )

}