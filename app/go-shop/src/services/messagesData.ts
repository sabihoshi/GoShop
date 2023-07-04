const baseUrl = 'http://localhost:5000';

export async function createChatRoom(receiver: number, message: string) {
    return (await fetch(`${baseUrl}/messages/createChatRoom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({message: message, receiver: receiver})
    })).json();
}

export async function getUserConversations() {
    return (await fetch(`${baseUrl}/messages/getUserConversations`, { credentials: 'include' })).json();
}

export async function sendMessage(chatId: number , message: string) {
    return (await fetch(`${baseUrl}/messages/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({chatId, message})
    })).json();
}