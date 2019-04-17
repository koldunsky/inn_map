import axios from 'axios';
import {root, endpoint} from './constants';
import _memoize from 'lodash/memoize';
import localStorageMapping from '../store/localstorageMapping';
import handleNetworkError from './handleNetworkError';
import router, {route} from '../router';

const getToken = {
    access: localStorage.getItem(localStorageMapping['accessToken']),
    refresh: localStorage.getItem(localStorageMapping['refreshToken'])
};

export const updateTokens = ({access, refresh}) => {
    if(!access || !refresh) {
        throw new Error('Нет токенов');
    }
    localStorage.setItem(localStorageMapping.accessToken, access);
    localStorage.setItem(localStorageMapping.refreshToken, refresh);
};

const parseJwt = _memoize((token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
});

const checkTokenIsActive = (purpose) => () => {
    let token = getToken[purpose];

    if (!token) {
        return false;
    }

    console.info(`${purpose} до:`, new Date(parseJwt(token).exp * 1000));
    return parseJwt(token).exp * 1000 > Date.now();
};

const checkToken = {
    refresh: checkTokenIsActive('refresh'),
    access: checkTokenIsActive('access')
};

let refreshTokenUpdatePromise = null;
let tryCount = 0;

const axiosInstance = axios.create({
    baseURL: root,
    timeout: 5000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(async (config) => {
    // Do something before request is sent
    console.info('before request is sent', config);

    if (!checkToken.refresh()) {
        console.info('рефреш стух');
        // Пойти на авторизацию
        router.push(route.auth);
        return config;
    } else if (!checkToken.access() && tryCount < 4) {
        console.info('access стух');
        // отложить запрос и пойти рефрешнуть
        if (refreshTokenUpdatePromise !== null) {
            console.info('Есть промис:', refreshTokenUpdatePromise);
            await refreshTokenUpdatePromise;
            config['Authorization'] = `Bearer ${getToken.access}`;
            tryCount++;
            return config;
        } else {
            if (tryCount > 4) {
                return config;
            }

            console.info('Нет промиса, щас сделаю');
            refreshTokenUpdatePromise = await axiosInstance.post(endpoint.refresh, {
                refresh: getToken.refresh
            });

            updateTokens(refreshTokenUpdatePromise);

            refreshTokenUpdatePromise = null;

            console.info('все, получил, обновил');
            console.info('checkToken.access', checkToken.access);
            console.info('checkToken.refresh', checkToken.refresh);

            config['Authorization'] = `Bearer ${getToken.access}`;
            tryCount++;
            return config;
        }
    } else {
        console.info('Все хорошо, просто верну');
        return config;
    }
}, function (error) {
    handleNetworkError(error);
    // Do something with request error
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    console.info('after receive', response);
    const {status, request: {responseURL}} = response;
    if (status === 200 && responseURL.includes(endpoint.access)) {
        router.push(route.root);
    }
    return response;
}, function (error) {
    handleNetworkError(error);
    return Promise.reject(error);
});

export default axiosInstance;
