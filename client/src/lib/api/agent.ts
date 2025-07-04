import axios from "axios";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })};

// This file sets up an Axios instance to interact with the .NET API.
// it also helps to avoid repeating the base URL in the code of our react app.
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // base URL for the API, set in .env.development file
});

// for every response axios gets, run this code
// simulating a delay for ALL requests to mimic a real-world scenario
agent.interceptors.response.use(async response => {
    try {
        await sleep(1000); // delay of 1 second
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});

export default agent;