import axios from "axios";
import config from "shared/config";

const apiInstance = axios.create({
    baseURL: config.BASE_URL
})

export { apiInstance }