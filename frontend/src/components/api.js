// src/components/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://vehicle-service-kfie.onrender.com/", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});


export default API;
