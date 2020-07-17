import axios from "axios";
import { API_URL } from "./config"

const getTaxes = (token) =>
  axios.get(`${API_URL}/taxes`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getTax = (token, id) =>
  axios.get(`${API_URL}/taxes/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setTax = (token, body) =>
  axios.post(`${API_URL}/taxes`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteTax = (token, id) =>
  axios.delete(`${API_URL}/taxes/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateTax = (token, id, body) =>
  axios.put(`${API_URL}/taxes/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getTaxes,
  getTax,
  setTax,
  deleteTax,
  updateTax,
}