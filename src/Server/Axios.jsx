import axios from "axios";

const instance = axios.create({
    baseURL: "https://fixitnepal.onrender.com"
})

export default instance ;