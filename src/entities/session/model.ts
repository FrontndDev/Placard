import Cookies from 'js-cookie';
import {createEffect, createEvent, createStore, restore, sample} from "effector";
import { atom } from "../../shared/libs/atom";
import {and, not, or, reset } from "patronum";
import { ACCESS_TOKEN, REFRESH_DELAY, REFRESH_TOKEN } from './config';
import { navigationModel } from '../../shared/navigation';
import {getSessionFx, refreshTokensFx} from "./api";
import {isClient} from "../../shared/utils";
import {signInFx} from "../../pages/auth/api";

export const sessionModel = atom(() => {
    const getSession = createEffect(getSessionFx);

    const logOut = createEvent();
    const redirectToAuth = createEvent();
    const checkTokenAndRedirect = createEvent();
    const startRefreshTokenWithInterval = createEvent();
    const $hasAccessToken = createStore(false);
    const $hasRefreshToken = createStore(false);
    const $isLogged = createStore(true);
    const $pending = or(
        signInFx.pending,
        // signUpUserFx.pending,
        refreshTokensFx.pending,
    );
    const $isRefreshed = refreshTokensFx.done;

    const $session = restore(getSession, null);

    // reset({
    //     clock: [signUpUserFx],
    //     target: [$session],
    // });

    sample({
        clock: [signInFx.doneData],
        fn: (result) => {
            Cookies.set(ACCESS_TOKEN, result.access_token, { expires: 0.0104167 });
            Cookies.set(REFRESH_TOKEN, result.refresh_token, { expires: 7 });
        },
    });

    sample({
        clock: refreshTokensFx.doneData,
        fn: (result) => {
            Cookies.set(ACCESS_TOKEN, result.access_token, { expires: 0.0104167 });
        },
    });

    // sample({
    //     clock: [signUpUserFx],
    //     fn: () => {
    //         Cookies.remove(ACCESS_TOKEN);
    //         Cookies.remove(REFRESH_TOKEN);
    //     },
    // });

    setInterval(() => {
        if (isClient) {
            startRefreshTokenWithInterval();
        }
    }, REFRESH_DELAY);

    sample({
        clock: [startRefreshTokenWithInterval],
        source: navigationModel.$asPath,
        filter: () => Boolean(Cookies.get(REFRESH_TOKEN)),
        fn: () => Cookies.get(REFRESH_TOKEN) ?? '',
        target: refreshTokensFx,
    });

    sample({
        clock: navigationModel.$asPath,
        fn: () => Boolean(Cookies.get(ACCESS_TOKEN)),
        target: [$hasAccessToken, $isLogged],
    });

    sample({
        clock: navigationModel.$asPath,
        fn: () => Boolean(Cookies.get(REFRESH_TOKEN)),
        target: [$hasRefreshToken, $isLogged],
    });

    sample({
        clock: getSession.failData,
        target: [logOut, redirectToAuth],
    });

    sample({
        clock: checkTokenAndRedirect,
        filter: not(and($hasAccessToken, $hasRefreshToken)),
        target: redirectToAuth,
    });

    sample({
        clock: redirectToAuth,
        fn: () => '/auth',
        target: navigationModel.pushFx,
    });

    sample({
        clock: refreshTokensFx.failData,
        target: logOut,
    });

    sample({
        clock: navigationModel.RouterGate.open,
        source: $isLogged,
        filter: Boolean,
        target: getSession,
    });

    sample({
        clock: logOut,
        fn: () => {
            Cookies.remove(ACCESS_TOKEN);
            Cookies.remove(REFRESH_TOKEN);
            return '/auth';
        },
        target: navigationModel.pushFx,
    });

    $session.reset(logOut);

    const forbidden = sample({
        clock: refreshTokensFx.doneData,
        filter: $isLogged.map((v) => !v),
    });

    sample({
        clock: forbidden,
        fn: () => '/auth',
        route: navigationModel.pushFx,
    });

    sample({
        clock: navigationModel.$asPath,
        source: $isLogged,
        filter: (isLogged, path) =>
            path !== null && !path!.startsWith('/auth') && !isLogged,
        // fn: () => '/auth',
        target: navigationModel.pushFx,
    });

    sample({
        clock: [
            refreshTokensFx.doneData,
            signInFx.doneData,
            // signUpUserFx.doneData,
        ],
        filter: (result) => !!result.access_token && !!result.refresh_token,
        fn: Boolean,
        target: $isLogged,
    });

    sample({
        clock: [signInFx.doneData],
        filter: $isLogged,
        target: getSession,
    });

    $isLogged.reset(logOut);

    const $getMePending = createStore<boolean>(true)
        .on(getSession.doneData, () => false)
        .on(forbidden, () => false);

    return {
        $isLogged,
        getSession,
        $getMePending,
        $pending,
        $session,
        logOut,
        $hasRefreshToken,
    };
});
