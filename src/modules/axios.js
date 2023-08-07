import { axios } from '@bundled-es-modules/axios';

const errorHandler = async error => {
    console.log(error);

    const errorMsg = `Error from : ${error.config.url}\n` + `status : ${error.response.status} \n` + `message: ${error.response.statusText}`;
    return Promise.reject(errorMsg);
};

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => errorHandler({ ...error })
);

export default instance;
