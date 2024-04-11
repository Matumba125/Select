import axios from "axios";

const axiosLiveInstance = axios.create({
    withCredentials: true,
    baseURL: "https://api.bashtel.online/",
});