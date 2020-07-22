import axios from "axios";
import { API_URL } from "./config"

const getBillPayments = (token) =>
  axios.get(`${API_URL}/bill-payments`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getBillPayment = (token, id) =>
  axios.get(`${API_URL}/bill-payments/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setBillPayment = (token, body) =>
  axios.post(`${API_URL}/bill-payments`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteBillPayment = (token, id) =>
  axios.delete(`${API_URL}/bill-payments/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateBillPayment = (token, id, body) =>
  axios.put(`${API_URL}/bill-payments/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getBillPayments,
  getBillPayment,
  setBillPayment,
  deleteBillPayment,
  updateBillPayment,
}