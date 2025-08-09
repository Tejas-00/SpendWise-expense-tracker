import axios from "axios"
import { BASE_URL } from "./apiPath.js"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
)

// Response Interseptors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        //Handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login page
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server Error. Please try again later")
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request Timeout. Please try agian later")
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;


// Axios is a popular JavaScript library used to make HTTP requests (like GET, POST, PUT, DELETE) from the browser or Node.js applications, providing an easy way to communicate with APIs and web servers using Promises. It simplifies handling asynchronous requests, data transformation, error management, and supports features like automatic JSON parsing and interceptors for modifying requests or responses.

// Summary of the Code:

// Creates a custom Axios instance to use for all API requests in your application.

// Sets default settings:

// Uses a base URL for all requests.

// Sets JSON headers.

// Adds a 10-second timeout to requests.

// Automatically attaches the user’s authentication token (from localStorage) as a Bearer token in request headers if it exists.

// Handles errors globally:

// If a 401 Unauthorized error happens, the user is redirected to the login page.

// If a 500 Server Error happens, it logs an error message.

// If the request times out, it logs a timeout message.

// Exports this configured Axios instance so you can import and use it throughout your app, ensuring all requests have the same configuration and error handling.

// In short:
// This code sets up Axios so all your API requests have the right headers, handle authentication automatically, and manage certain errors in one place.