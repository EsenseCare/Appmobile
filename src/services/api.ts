import axios from 'axios'

const api = axios.create({
    baseURL: 'http://179.110.8.2:3333'
});

export default api;