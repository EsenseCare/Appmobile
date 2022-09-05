import axios from 'axios'
const api = axios.create({
    baseURL: 'https://esense-stage.herokuapp.com/api_mobile'
});

export const authService = {
    async authenticate(data: any) {
        return await api.post(`/auth_user`, data);       
    },   
}

export default api;