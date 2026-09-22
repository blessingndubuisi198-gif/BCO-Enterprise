import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/api/products`;

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};