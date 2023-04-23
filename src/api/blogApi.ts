import {axiosClient} from './axiosClient';

export const blogApi = {
    getList() {
        const url = '/blogs';

        return axiosClient.get(url);
    },
};

