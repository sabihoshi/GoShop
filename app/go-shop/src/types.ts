export interface UserData {
    name: string | null;
    username: string;
    lastName: string | null;
    gender: string | null;
    phoneNumber: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    title: string;
    description: string;
    category: string;
    id: number;
    image: string;
    imageFile?: File;
    price: number;
    addedAt: Date;
    city: string;
}

export function getDummyProduct(): Product {
    return {
        title: '',
        description: '',
        category: '',
        id: 0,
        image: '',
        price: 0,
        addedAt: new Date(),
        city: ''
    }
}

export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    gender: string;
    phoneNumber: string;
    avatar?: string;
    avatarFile?: File;
    totalSells: number;
}

export function getDummyUser(): User {
    return {
        id: 0,
        username: '',
        email: '',
        name: '',
        gender: '',
        phoneNumber: '',
        totalSells: 0
    }
}