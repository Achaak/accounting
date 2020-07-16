import axios from "axios";
import { API_URL } from "./config"

const getLocal = async (identifier, password) =>
  axios.post(`${API_URL}/auth/local`, {
    identifier: identifier,
    password: password,
  }, { validateStatus: false })

export default {
  getLocal
}