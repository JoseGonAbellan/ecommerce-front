import axios from "axios"
import { Product, ProductType } from "../common/types/product"

export type FilterProducts = {
    productName?: string,
    pageSize?: number,
    page?: number,
    productType?: ProductType | null,
    price?: number
}
const apiUrl = process.env.REACT_APP_API_URL
export const getAllProducts = (filters?: FilterProducts) => {
    const currentPage = filters?.page ? filters.page: 1;
    const currentPageSize = filters?.pageSize ? filters.pageSize: 5;
    let url = `${apiUrl}/products?pageSize=${currentPageSize}&page=${currentPage}`;
    if(filters?.productName){
        url += `&filter[productName]=${filters.productName}`
    }
    if(filters?.productType && filters.productType !== null){
        url += `&filter[productType]=${filters.productType}`
    }
    if(filters?.price && filters.price !== 0){
        url += `&filter[price]=${filters.price}`
    }
    return axios.get<Product[]>(url).then((response) => response.data)
}

export const getProductById = (id: number) => {
    return axios.get<Product>(`${apiUrl}/products/${id}`).then((respone) => respone.data)
}