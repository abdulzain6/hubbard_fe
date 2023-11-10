import axios, { type AxiosInstance } from 'axios'
import { useUserStore } from './store/user'

const instance: AxiosInstance = axios.create({
    baseURL: "http://146.190.14.15"
})

// Add a request interceptor
instance.interceptors.request.use((config) => {
    const userStore = useUserStore(); // Access your Pinia store instance
    const token = userStore.user.access_token; // Access the token from the store
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default instance