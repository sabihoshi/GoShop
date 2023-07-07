import axios from 'axios';

const baseUrl = `http://${window.location.hostname}:80/GoShop/api`;
const apiClient = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function createChatRoom(receiver: number, message: string): Promise<Chat> {
    const response = await apiClient.post('/messages/createChatRoom.php', {message, receiver});
    return response.data;
}

interface User {
    id: number;
    avatar: string;
    name: string;
}

interface Chat {
    id: number;
    seller: User;
    buyer: User;
    conversation: { message: string, senderId: number }[];
    isBuyer: boolean | null;
}

interface Conversations {
    chats: Chat[];
    isBuyer: boolean | null;
    myId: number;
}

export async function getUserConversations(): Promise<Conversations> {
    const response = await apiClient.get('/messages/getUserConversations.php');
    return response.data;
}

interface Conversation {
    senderId: number
}

export async function sendMessage(chatId: number, message: string): Promise<Conversation> {
    const response = await apiClient.post('/messages/sendMessage.php', {chatId, message});
    return response.data;
}