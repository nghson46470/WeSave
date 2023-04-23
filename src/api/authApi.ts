import { AxiosResponse } from 'axios'
import { axiosClient } from './axiosClient'
// khi function không trả về thì kiểu dữ liệu là void ,trả về kiểu dữ liệu là promise trả về định dạng axiosRespone
interface IAuthApi {
    login: (body: object) => Promise<AxiosResponse> | void
    register: (body: object) => Promise<AxiosResponse> | void
    logout : ()=> Promise<AxiosResponse> | void
    getCurrentUser : ()=> Promise<AxiosResponse> | void
}

export const authApi: IAuthApi = {
    login: (body: object = {}) => {
        if (body) {
            let url = '/auth/login'
            return axiosClient.post(url, body)
        }
    },
    register: (body: object = {}) => {
        if (body) {
            let url = '/auth/register'
            return axiosClient.post(url, body)
        }
    },
    logout() {
        const url = '/auth/logout';

        return axiosClient.post(url);
    },
    getCurrentUser() {
        const url = '/auth/me';

        return axiosClient.get(url);
    },
}
