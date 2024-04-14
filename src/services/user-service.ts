import axios from "axios"
import { SimpleUser, User } from "../common/types/user"

const apiUrl = process.env.REACT_APP_API_URL
type UpdateUserParams={
   form: User;
   id: number;
}

export const createUser = (form: User) => {
   return axios.post<User>(`${apiUrl}/users`, form).then((respone) => respone.data)
}

export const loginUser = (form: SimpleUser) => {
   return axios.post<User>(`${apiUrl}/users/login`, form).then((respone) => respone.data)
}

export const updateUser = ({form, id}:UpdateUserParams) => {
   return axios.put<User>(`${apiUrl}/users/${id}`, form).then((respone) => respone.data)
}