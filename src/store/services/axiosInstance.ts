import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import axios from "axios";
import { Store } from "../store";

const baseURL = `${REACT_APP_WHISPER_SERVICE_BASEURL}`;

const axiosInstance = axios.create({ baseURL });

export const initAxiosInterceptors = (store:Store) => {
    axiosInstance.interceptors.request.use(config => {
        const token = store.getState()?.user?.token;        
    
        if(token != null) {
            config.headers['x-auth-token'] = token;
        }
    
        return config;
    });
}

export default axiosInstance;
