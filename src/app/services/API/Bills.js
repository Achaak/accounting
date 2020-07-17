import axios from "axios";
import { API_URL } from "./config"

const getBills = (token) =>
  axios.get(`${API_URL}/bills`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getBill = (token, id) =>
  axios.get(`${API_URL}/bills/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setBill = (token, body) =>
  axios.post(`${API_URL}/bills`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteBill = (token, id) =>
  axios.delete(`${API_URL}/bills/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateBill = (token, id, body) =>
  axios.put(`${API_URL}/bills/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getBills,
  getBill,
  setBill,
  deleteBill,
  updateBill,
}