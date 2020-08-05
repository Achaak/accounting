import axios from "axios";
import { API_URL } from "./config"

const getContacts = (token) =>
  axios.get(`${API_URL}/contacts`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getContact = (token, id) =>
  axios.get(`${API_URL}/contacts/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setContact = (token, body) =>
  axios.post(`${API_URL}/contacts`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteContact = (token, id) =>
  axios.delete(`${API_URL}/contacts/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateContact = (token, id, body) =>
  axios.put(`${API_URL}/contacts/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getContacts,
  getContact,
  setContact,
  deleteContact,
  updateContact,
}