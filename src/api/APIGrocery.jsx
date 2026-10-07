import axios from "axios"

const API = axios.create({
    baseURL:"http://localhost:3000"
})

export const PostGrocery = (data) => API.post("/grocery" ,data)

export const GetGrocery = () => API.get("/grocery")

export const deleteGrocery = (id) => API.delete(`/grocery/${id}`)

