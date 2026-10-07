import { create } from "axios";


const API = create({
    baseURL:"http://localhost:3000"
})

export const PostUser = (data) => API.post("/user",data)

export const GetUser = () => API.get("/user") 

export const PutUser = (editingid,data) => API.put(`/user/${editingid}`,data)

export const DeleteUser = (id) => API.delete(`/user${id}`)