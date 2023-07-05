
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

 export interface Product {
    category: string;
    _id: number;
    image: string;
    title: string;
    price: number;
    addedAt: Date;
    city: string;
}