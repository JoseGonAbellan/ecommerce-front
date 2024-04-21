import axios from "axios"
import { CreateProduct, Product, ProductType } from "../common/types/product"

export type FilterProducts = {
    productName?: string,
    pageSize?: number,
    page?: number,
    productType?: ProductType | null,
    price?: number
}
const apiUrl = process.env.REACT_APP_API_URL
export const getAllProducts = (filters?: FilterProducts) => {
    const currentPage = filters?.page ? filters.page : 1;
    const currentPageSize = filters?.pageSize ? filters.pageSize : 5;
    let url = `${apiUrl}/products?pageSize=${currentPageSize}&page=${currentPage}`;
    if (filters?.productName) {
        url += `&filter[productName]=${filters.productName}`
    }
    if (filters?.productType && filters.productType !== null) {
        url += `&filter[productType]=${filters.productType}`
    }
    if (filters?.price && filters.price !== 0) {
        url += `&filter[price]=${filters.price}`
    }
    return axios.get<Product[]>(url).then((response) => response.data)
}

export const getProductById = (id: number) => {
    return axios.get<Product>(`${apiUrl}/products/${id}`).then((respone) => respone.data)
}
type createProductPropierties = {
    form: CreateProduct;
    token: string;
}

export const createProduct = ({ form, token }: createProductPropierties) => {
    return axios.post<Product>(`${apiUrl}/products`, form, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
}

export const deleteProduct = (id: number, token: string) => {
    return axios.delete<Product>(`${apiUrl}/products/${id}`, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
}

type updateProductPropierties = {
    form: CreateProduct;
    token: string;
    id: number
}

export const updateProduct = ({ form, token, id }: updateProductPropierties) => {
    return axios.put<Product>(`${apiUrl}/products/${id}`, form, {
        headers: {
            Authorization: token
        }
    }).then((respone) => respone.data)
}