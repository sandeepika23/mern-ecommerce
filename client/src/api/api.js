import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-ecommerce-api-1w14.onrender.com",
});

export default API;