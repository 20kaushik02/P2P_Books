//Front end Axios API for back end API notifications.js

import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:9001/api/notifications",
});