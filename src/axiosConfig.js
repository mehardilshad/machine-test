import axios from 'axios'

export const general = axios.create({
  baseURL: 'https://conext.in/custom_users/api/',
})
