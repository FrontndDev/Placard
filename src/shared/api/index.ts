import xior, {XiorInstance} from "xior";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../entities/session/config";
import Cookies from "js-cookie";
import createAuthRefreshInterceptor from 'xior-auth-refresh';

export const api: XiorInstance = xior.create({
    baseURL: 'http://localhost:3001/api',
});

const getToken = () => {
    if (typeof window !== 'undefined') {
        return Cookies.get(ACCESS_TOKEN) ?? '';
    }
    return '';
};

const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
        Cookies.set(ACCESS_TOKEN, token);
    }
};

const getRefreshToken = () => {
    if (typeof window !== 'undefined') {
        return Cookies.get(REFRESH_TOKEN) ?? '';
    }
    return '';
};

const refreshAuthLogic = (failedRequest: any) =>
    xior
        .post(`http://localhost:3001/api/auth/refresh`, {
            refresh_token: getRefreshToken(),
        })
        .then((tokenRefreshResponse) => {
            setToken(tokenRefreshResponse.data.access_token);
            failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.access_token}`;
            return Promise.resolve();
        });

createAuthRefreshInterceptor(api, refreshAuthLogic);

api.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${getToken()}`;
    return request;
});
