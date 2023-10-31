import axios from 'axios';

export const USERSAPI = axios.create({
  baseURL : "https://hexashop.shop/"
})