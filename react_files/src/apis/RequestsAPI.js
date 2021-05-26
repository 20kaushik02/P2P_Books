//Front end Axios API for back end API requests.js

import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:9001/api/requests",
})