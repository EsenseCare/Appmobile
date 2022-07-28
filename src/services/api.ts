import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.15.60:3333'
});

export const authService = {
    async authenticate(data: any) {
        const endpoint = `${api}/session`;
        return await axios.post(endpoint, data);
    },
}
export default api;