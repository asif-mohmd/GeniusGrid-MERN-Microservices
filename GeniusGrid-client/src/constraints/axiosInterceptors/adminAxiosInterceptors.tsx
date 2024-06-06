import axios from "axios";

const authURL = import.meta.env.VITE_APIURL;

export const adminAxios = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json",
        
    },
    withCredentials:true
});
adminAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('admintoken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});