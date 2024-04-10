import axios from "axios"
import { Product } from "../common/types/product"

export const getAllProducts = () => {
    return axios.get<Product[]>("http://localhost:3000/products?pageSize=5&page=1").then((response) => response.data)
}