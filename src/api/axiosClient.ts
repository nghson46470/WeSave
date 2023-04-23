import axios from 'axios'
import { store } from '~/redux'

export const axiosClient = axios.create({
    baseURL: 'https://reactojt-api.fullstack.edu.vn/api/',
})

//thực hiện gì trc khi đẩy dữ liệu lên
axiosClient.interceptors.request.use(
    function (config) {
        const state = store.getState()
        const token = state.auth.token

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// thực hiện gì trc khi dữ liệu trả về
axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return Promise.reject(error.response.data)
    }
)
