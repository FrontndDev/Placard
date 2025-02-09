import {atom} from "../../shared/libs/atom";
import {createField, createForm} from "@effector-reform/core";
import {zodAdapter} from "@effector-reform/zod";
import { z } from "zod";
import {sample} from "effector";
import {signInFx} from "./api";
import { navigationModel } from "../../shared/navigation";

export const authPageModel = atom(() => {
    const form = createForm({
        schema: {
            email: createField<string>('test@example.com'),
            password: createField<string>('mypassword123')
        },
        validation: zodAdapter(z.object({
            email: z.string().email('Invalid email address'),
            password: z.string().min(5, 'Password must be at least 6 characters'),
        })),
        validationStrategies: ['submit'],
    })

    sample({
        clock: form.validatedAndSubmitted,
        target: signInFx
    })

    sample({
        clock: signInFx.doneData,
        fn: () => '/',
        target: navigationModel.pushFx,
    });

    return {
        form
    }
})
