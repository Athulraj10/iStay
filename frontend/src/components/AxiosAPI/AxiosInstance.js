import axios from 'axios';

export const USERSAPI = axios.create({
  baseURL : " http://localhost:3000/api/"
})