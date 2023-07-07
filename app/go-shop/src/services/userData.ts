import axios from 'axios';
import {User, UserData} from "../types";

const axiosInstance = axios.create({
    baseURL: `http://${window.location.hostname}:80/GoShop/api`,
    withCredentials: true,
    headers: {
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


export async function getLoggedInUser(): Promise<User> {
    const response = await axiosInstance.get('/auth/me.php');
    return response.data;
}

export async function getUserActiveSells(id: number) {
    const response = await axiosInstance.get(`/products/sells/active.php?id=${id}`);
    return response.data;
}

export async function getUserArchivedSells(id: number) {
    const response = await axiosInstance.get(`/products/sells/archived.php?id=${id}`);
    return response.data;
}

export async function getUserWishlist() {
    const response = await axiosInstance.get('/products/wishlist/getWishlist.php');
    return response.data;
}

export async function isLoggedIn(): Promise<boolean> {
    const response = await axiosInstance.get('/auth/isAuthorized.php');
    return response.data;
}

export async function editUserProfile(id: any, user: User) {
    let formData = new FormData();
    Object.keys(user).forEach(key => {
        // @ts-ignore
        formData.append(key, user[key]);
    });

    const response = await axiosInstance.post(`/user/editProfile.php?id=${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export async function getUserById(id: number) {
    const response = await axiosInstance.get(`/user/getUserById.php?id=${id}`);
    return response.data;
}