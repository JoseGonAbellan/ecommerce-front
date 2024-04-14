import axios from "axios"
import { OrderPropierties } from "../common/types/order"

const apiUrl = process.env.REACT_APP_API_URL
type getOrderPropierties = {
    id: number;
    token: string;
}

export const getOrders = ({id, token}:getOrderPropierties) => {
   return axios.get<OrderPropierties[]>(`${apiUrl}/orders?pageSize=10&page=1&userId=${id}`, {
    headers:{
        Authorization: token
    }
   }).then((respone) => respone.data)
}