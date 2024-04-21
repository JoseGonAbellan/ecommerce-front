import { OrderPropierties } from "../../common/types/order";
import { transformDate } from "../../common/utils/transform-date";
import { useCustomRouter } from "../../router/custom-router";
import styles from "./orderPreview.module.css";

type OrderPreviewPropierties = {
  order: OrderPropierties
}
export const OrderPreview: React.FC<OrderPreviewPropierties> = ({ order }) => {
  const { goOrderDetail } = useCustomRouter()
  const { orderDate, totalAmount, orderId, orderStatus } = order;
  const date = transformDate(orderDate)
  return (
    <div className={styles.orderPreviewContainer}onClick={() => goOrderDetail(order.orderId as number)}>
      <p className={styles.orderPreview}>Número de pedido: {orderId}</p>
      <p className={styles.orderPreview}>Fecha de pedido: {date}</p>
      <p className={styles.orderPreview}>Precio: {totalAmount}</p>
      <p className={styles.orderPreview}>Estado: {orderStatus}</p>
    </div>
  );
}