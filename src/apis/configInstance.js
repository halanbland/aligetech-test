import axios from "axios";

const url = process.env.REACT_APP_API_ENDPOINT;

const token = localStorage.getItem("TOKEN");

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    timeout: 30 * 1000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // handle before request is sent
        return config;
    },
    (error) => {
        // handle request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // handle response data
        return response;
    },
    (error) => {
        // handle response un-authen error
        if (error.response.status === 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
