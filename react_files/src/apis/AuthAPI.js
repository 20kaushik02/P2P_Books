//Front end Axios API for back end API auth.js

import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:9001/api/auth",
});