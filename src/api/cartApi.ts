import { AxiosResponse } from 'axios';
import {axiosClient} from './axiosClient';

interface ICartApi {
    getUnpaidCart: () => Promise<AxiosResponse> | void
    update:(id: string|number, products: object)=>Promise<AxiosResponse> | void
}

export const cartApi:ICartApi = {
    getUnpaidCart() {
        const url = '/carts/unpaid';

        return axiosClient.get(url);
    },
    update(id, products) {
        const url = `/carts/${id}`;

        return axiosClient.patch(url, {
            products,
        });
    },
};

