import axios from "axios";
import { API_URL } from "./config"

const getContactPeople = (token) =>
  axios.get(`${API_URL}/contact-people`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getContactPerson = (token, id) =>
  axios.get(`${API_URL}/contact-people/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setContactPerson = (token, body) =>
  axios.post(`${API_URL}/contact-people`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteContactPerson = (token, id) =>
  axios.delete(`${API_URL}/contact-people/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateContactPerson = (token, id, body) =>
  axios.put(`${API_URL}/contact-people/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getContactPeople,
  getContactPerson,
  setContactPerson,
  deleteContactPerson,
  updateContactPerson,
}