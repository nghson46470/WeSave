import { AxiosResponse } from "axios";
import { axiosClient } from "./axiosClient";

interface IorderApi {
    createOrder :(body:object) => Promise<AxiosResponse> | void
}

export const orderApi:IorderApi = {
    createOrder : (body)=>{
        const url = '/orders';
        return axiosClient.post(url, body);
    }
}