import {atom} from "../../shared/libs/atom";
import {createEffect, restore} from "effector";
import { getProfileMeFx } from "./api";

export const profileModel = atom(() => {
    const getProfileMe = createEffect(getProfileMeFx)

    const $profile = restore(getProfileMe, null)

    const $profilePending = getProfileMe.pending

    return {
        getProfileMe,
        $profile,
        $profilePending,
    }
})
