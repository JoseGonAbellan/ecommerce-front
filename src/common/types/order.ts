
export enum OrderStatus {
    PENDING = "Pendiente",
    SEND = "Enviado",
    DELIVERED = "Entregado"
}

export enum ShippingOptions {
    HOME = "A domicilio",
    STORE = "Recogida en tienda"
}

export enum PaymentMethod {
    CASH_ON_DELIVERY = "A contrareembolso",
    PAY_ON_STORE = "Pagar en tienda"
}


export type OrderDetailsPropierties = {
    orderDetailId?: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
};

export type OrderPropierties = {
    orderId?: number;
    userId: number;
    orderDate: Date;
    totalAmount?: number;
    orderDetails?: OrderDetailsPropierties[];
    orderStatus: OrderStatus;
    shippingOptions: ShippingOptions;
    paymentMethod: PaymentMethod

};
