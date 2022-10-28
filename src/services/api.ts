import axios from 'axios'
const api = axios.create({
    baseURL: 'https://esense-stage.herokuapp.com/api_mobile'
});

export const authService = {
    async authenticate(data: any) {
        return await api.post(`/auth/login`, data);       
    },   
}

export default api;