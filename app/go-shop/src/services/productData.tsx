import axios from 'axios';

const baseUrl = 'http://localhost/GoShop/api';

export async function getAll(page: number, category: string = "all", query: string = "") {
    const response = await axios.get(`${baseUrl}/products/getAll.php`, {
        params: {
            page,
            search: query === "" ? undefined : query,
            category: category === 'all' ? undefined : category
        }
    });
    return response.data;
}

export async function getSpecific(id: number) {
    const response = await axios.get(`${baseUrl}/products/getSpecific.php?id=${id}`, {withCredentials: true});
    return response.data;
}

export async function createProduct(product: object) {
    const response = await axios.post(`${baseUrl}/products/create.php`, product, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function editProduct(id: number, product: object) {
    const response = await axios.patch(`${baseUrl}/products/edit.php?id=${id}`, product, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function activateSell(id: number) {
    const response = await axios.get(`/products/enable.php?id=${id}`);
    return response.data;
}

export async function archiveSell(id: number) {
    const response = await axios.get(`/products/archive.php?id=${id}`);
    return response.data;
}

export async function wishProduct(id: number) {
    const response = await axios.get(`${baseUrl}/products/wish.php?id=${id}`, {withCredentials: true});
    return response.data;
}