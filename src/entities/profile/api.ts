import {createEffect} from "effector";
import {Profile} from "../../shared/api/types";
import xior, {XiorError} from "xior";

export const getProfileMeFx = createEffect<string, Profile, XiorError>((token) =>
    xior.get(`http://localhost:3001/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => response.data),
);
