import axios from "axios";
import { getToken } from "../helpers/localstorage/localstorage.helper";

export const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${getToken() || ''}`
    }
})