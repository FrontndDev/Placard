import {atom} from "../../shared/libs/atom";
import {createEvent, sample} from "effector";
import {profileModel} from "../../entities/profile";

export const profilePageModel = atom(() => {
    const pageStarted = createEvent<{ access_token: string }>()

    sample({
        clock: pageStarted,
        fn: ({access_token}) =>  access_token,
        target: profileModel.getProfileMe
    })

    return {
        pageStarted
    }
})
