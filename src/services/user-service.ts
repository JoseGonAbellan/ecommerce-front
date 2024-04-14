import axios from "axios"
import { SimpleUser, User } from "../common/types/user"

const apiUrl = process.env.REACT_APP_API_URL

export const createUser = (form: User) => {
   return axios.post<User>(`${apiUrl}/users`, form).then((respone) => respone.data)
}

export const loginUser = (form: SimpleUser) => {
   return axios.post<User>(`${apiUrl}/users/login`, form).then((respone) => respone.data)
}