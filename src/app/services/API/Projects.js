import axios from "axios";
import { API_URL } from "./config"

const getProjects = (token) =>
  axios.get(`${API_URL}/projects`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const getProject = (token, id) =>
  axios.get(`${API_URL}/projects/${id}`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

const setProject = (token, body) =>
  axios.post(`${API_URL}/projects`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const deleteProject = (token, id) =>
  axios.delete(`${API_URL}/projects/${id}`,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })
  
const updateProject = (token, id, body) =>
  axios.put(`${API_URL}/projects/${id}`, body,{
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getProjects,
  getProject,
  setProject,
  deleteProject,
  updateProject,
}