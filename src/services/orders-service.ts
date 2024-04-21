import axios from "axios";
import { OrderPropierties, PaymentMethod, ShippingOptions } from "../common/types/order";

const apiUrl = process.env.REACT_APP_API_URL

type getAllByUsersFilters = {
    pageSize?: number,
    page?: number,
}
type getOrderPropierties = {
    userId: number;
    token: string;
    filters?: getAllByUsersFilters;
}

export const getOrdersByUser = ({ userId, token, filters }: getOrderPropierties) => {

    const currentPage = filters?.page ? filters.page : 1;
    const currentPageSize = filters?.pageSize ? filters.pageSize : 5;
    const url = `${apiUrl}/orders/user?pageSize=${currentPageSize}&page=${currentPage}&userId=${userId}`;

    return axios.get<OrderPropierties[]>(url, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
}

type createOrder = {
    form: createOrderForm,
    token: string,
}
export type createOrderForm = {
    userId: number;
    orderDate: string;
    productsOrders: {
        id: number,
        quantity: number
    }[],
    shippingOptions: ShippingOptions;
    paymentMethod: PaymentMethod;
}
export const createOrder = ({ form, token }: createOrder) => {
    return axios.post<OrderPropierties>(`${apiUrl}/orders`, form, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
};
type getOrderByIdPropierties = {
    token: string,
    orderId: number
}
export const getOrderById = ({ token, orderId }: getOrderByIdPropierties) => {
    return axios.get<OrderPropierties>(`${apiUrl}/orders/${orderId}`, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
};

type getAllFilters = {
    pageSize?: number,
    page?: number,
    orderId?: number,
}
type getAllOrdersPropierties = {
    token: string;
    filters?: getAllFilters;

}
export const getAllOrders = ({ filters, token }: getAllOrdersPropierties) => {
    const currentPage = filters?.page ? filters.page : 1;
    const currentPageSize = filters?.pageSize ? filters.pageSize : 5;
    let url = `${apiUrl}/orders?pageSize=${currentPageSize}&page=${currentPage}`;
    if (filters?.orderId) {
        url += `&orderId=${filters.orderId}`
    }

    return axios.get<OrderPropierties[]>(url, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
};

type updateOrderPropierties = {
    orderId: number,
    token: string,
    order: OrderPropierties
}
export const updateStatusOrder = ({ order, orderId, token }: updateOrderPropierties) => {

    return axios.patch<OrderPropierties>(`${apiUrl}/orders/${orderId}`, order, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
}