import axios from 'axios';
import { UserData } from "../types";

const axiosInstance = axios.create({
    baseURL: 'http://localhost/GoShop/api',
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    }
});

export async function registerUser(userData: UserData) {
    const response = await axiosInstance.post('/auth/register.php', userData);
    return response.data;
}

interface IUserCredentials {
    username: string;
    password: string;
}

export async function loginUser(userData: IUserCredentials) {
    const response = await axiosInstance.post('/auth/login.php', userData);
    return response.data;
}

export async function getUser() {
    const response = await axiosInstance.get('/auth/me.php');
    return response.data;
}

export async function getUserActiveSells(id: any) {
    const response = await axiosInstance.get(`/products/sells/active.php?id=${id}`);
    return response.data;
}

export async function getUserArchivedSells() {
    const response = await axiosInstance.get('/products/sells/archived');
    return response.data;
}

export async function getUserWishlist() {
    const response = await axiosInstance.get('/products/wishlist/getWishlist');
    return response.data;
}

export async function editUserProfile(id: any, data: any) {
    const response = await axiosInstance.patch(`/user/edit-profile.php?id=${id}`, data);
    return response.data;
}

export async function getUserById(id: number) {
    const response = await axiosInstance.get(`/user/getUserById/${id}`);
    return response.data;
}