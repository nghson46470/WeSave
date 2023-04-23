import { AxiosResponse } from 'axios'
import { Iresponse } from 'src/pages/SearchResult'
import { axiosClient } from './axiosClient'
// khi function không trả về thì kiểu dữ liệu là void ,trả về kiểu dữ liệu là promise trả về định dạng axiosRespone
interface IProductApi {
    getProduct: (q: string, all?: boolean) => Promise<AxiosResponse> | void
    follow: (id: string | number) => Promise<AxiosResponse> | void
    unFollow: (id: string | number) => Promise<AxiosResponse> | void
    getFeaturedList: () => Promise<AxiosResponse> | void
    getLatestList: () => Promise<AxiosResponse> | void
    getTrendingProduct: () => Promise<AxiosResponse> | void
    getProductDetail: (id: string | undefined | number) => Promise<AxiosResponse> | void
    addToCart: (id: string | number) => Promise<AxiosResponse> | void
    removeFromCart: (id: string | number) => Promise<AxiosResponse> | void
}

export const productApi: IProductApi = {
    getProduct: (q = '', all = false) => {
        let url = 'products'
        if (q) {
            url += `?q=${q}`
        }
        if (all) {
            url += '&all=true'
        }

        return axiosClient.get(url)
    },
    follow(id) {
        const url = `/products/${id}/follow`

        return axiosClient.post(url)
    },
    unFollow(id) {
        const url = `/products/${id}/un-follow`

        return axiosClient.post(url)
    },
    getFeaturedList() {
        const url = '/products/featured'

        return axiosClient.get(url)
    },
    getLatestList() {
        const url = '/products/latest'

        return axiosClient.get(url)
    },
    getTrendingProduct() {
        const url = '/products/featured'

        return axiosClient.get(url)
    },
    getProductDetail(id) {
        const url = `/products/${id}`

        return axiosClient.get(url)
    },
    addToCart(id) {
        const url = `/products/${id}/add-to-cart`;

        return axiosClient.post(url);
    },
    removeFromCart(id) {
        const url = `/products/${id}/remove-from-cart`;

        return axiosClient.post(url);
    },
}
