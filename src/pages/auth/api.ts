import {createEffect} from "effector";
import {api} from "../../shared/api";

export const signInFx = createEffect<{ email: string; password: string }, { access_token: string; refresh_token: string }, Error>((form) =>
    api.post("/auth/signin", form).then((response) => response.data),
);

