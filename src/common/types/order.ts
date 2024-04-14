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
};