import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import axios from "axios";

const baseURL = `${REACT_APP_WHISPER_SERVICE_BASEURL}`;

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;
