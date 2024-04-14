import { OrderPropierties } from "../../common/types/order";
import { transformDate } from "../../common/utils/transform-date";
import { useCustomRouter } from "../../router/custom-router";

type OrderPreviewPropierties = {
    order: OrderPropierties
}
export const OrderPreview: React.FC<OrderPreviewPropierties> = ({order}) => {
  const {goProductDetailPage} = useCustomRouter()
  const {orderDate, totalAmount, orderId} = order;
  const date = transformDate(orderDate)
  return (
    <div onClick={() => console.log(orderId)}>
      <p>Número de pedido: {orderId}</p>
      <p>Fecha de pedido: {date}</p>
      <p>Precio: {totalAmount}</p>
    </div>
  );
}