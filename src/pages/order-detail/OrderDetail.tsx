import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { OrderPropierties, OrderStatus } from "../../common/types/order";
import { Product } from "../../common/types/product";
import { RolEnum } from "../../common/types/user";
import { transformDate } from "../../common/utils/transform-date";
import { useUser } from "../../context/user-context";
import { getOrderById, updateStatusOrder } from "../../services/orders-service";
import { getProductById } from "../../services/product-service";

export const OrderDetail = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [order, setOrder] = useState<OrderPropierties>();
    const [productDetails, setProductDetails] = useState<Product[]>([]);
    const token = generateJWT(user, secretKey);

    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>();

    useEffect(() => {
        if (user?.userID && id) {

            getOrderById({ orderId: parseInt(id), token }).then((response) => {
                setOrder(response);
                setSelectedStatus(response.orderStatus);
            });

        }

    }, [id])

    useEffect(() => {
        if (order?.orderDetails) {
            for (let product of order.orderDetails) {
                getProductById(product.productId).then((response) => setProductDetails([...productDetails, response]));
            }
        }

    }, [order])

    const handleUpdateStatus = async () => {
        if (id && order && selectedStatus) {
            await updateStatusOrder({
                orderId: parseInt(id),
                order: {
                    ...order,
                    orderStatus: selectedStatus
                },
                token,
            })

            alert("pedido actualizado")
        }

    }

    const ProductDetail: React.FC = () => {
        return (
            <div>
                {order?.orderDetails?.map((detail) => {
                    const findProduct = productDetails.find((singleProduct) => singleProduct.productID === detail.productId);
                    if (findProduct) {
                        return (
                            <ul key={detail.productId}>
                                <li>{findProduct.productName}</li>
                                <li>Precio: {findProduct.price} €</li>
                                <li>
                                    <img src={findProduct.productImageURL} alt={findProduct.productName} />
                                </li>
                                <li>Cantidad: {detail.quantity}</li>

                            </ul>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    };

    return (
        <div >
            {order && (
                <div>
                    <h2>Detalle del pedido {order.orderId}</h2>
                    <ul>
                        <li>Estado del pedido: {order.orderStatus}</li>
                        <li>Fecha del pedido: {transformDate(order.orderDate)}</li>
                        <li>Coste total: {order.totalAmount} €</li>
                        <li>Método de pago: {order.paymentMethod}</li>
                        <li>Método de envío: {order.shippingOptions}</li>
                        <h3>Detalle del producto</h3>
                        <ProductDetail />
                    </ul>
                </div>
            )}

            {user?.rol === RolEnum.ADMIN &&

                <form onSubmit={handleUpdateStatus}>
                    <select onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)} value={selectedStatus}>
                        <option value={OrderStatus.PENDING}>{OrderStatus.PENDING}</option>
                        <option value={OrderStatus.SEND}>{OrderStatus.SEND}</option>
                        <option value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</option>
                    </select>
                    <button type="submit">Actualizar estado</button>
                </form>
            }
        </div>
    );


}