import axios from "axios";
import { API_URL } from "./config"

const getClients = (token) =>
  axios.get(`${API_URL}/clients`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getClient = (token, id) =>
  axios.get(`${API_URL}/clients/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setClient = (token, body) =>
  axios.post(`${API_URL}/clients`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteClient = (token, id) =>
  axios.delete(`${API_URL}/clients/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateClient = (token, id, body) =>
  axios.put(`${API_URL}/clients/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getClients,
  getClient,
  setClient,
  deleteClient,
  updateClient,
}