import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:9001/api/dashboard",
    headers: {
        token: localStorage.getItem("token")
    }
})