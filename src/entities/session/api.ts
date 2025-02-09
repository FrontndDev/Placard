import {createEffect} from "effector";
import {api} from "../../shared/api";
import {Session, TokenPair} from "../../shared/api/types";

export const getSessionFx = createEffect<void, Session, Error>(() =>
    api.get(`/auth/me`).then((response) => response.data),
);

export const refreshTokensFx = createEffect<string, TokenPair, Error>(
    async (refresh_token) =>
        api
            .post(`/auth/refresh`, { refresh_token })
            .then((response) => response.data)
);
