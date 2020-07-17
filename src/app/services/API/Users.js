import axios from "axios";
import { API_URL } from "./config"

const getMe = (token) =>
  axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: "Bearer " + token },
    validateStatus: false
  })

export default {
  getMe
}