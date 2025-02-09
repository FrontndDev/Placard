import { allSettled, fork, serialize } from 'effector';
import { profilePageModel } from '../src/pages/profile';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = context.req.headers.cookie || '';

    const parsedCookies = parseCookies(cookies);
    const accessToken = parsedCookies['access_token'];
    const refreshToken = parsedCookies['refresh_token'];

    if (!accessToken || !refreshToken) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    const scope = fork();

    try {
        await allSettled(profilePageModel.pageStarted, {
            scope,
            params: { access_token: accessToken },
        });
    } catch (error) {
        console.error('Failed to initialize the scope:', error);

        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        };
    }

    const values = serialize(scope);

    return {
        props: {
            values,
        },
    };
}

function parseCookies(cookieHeader: string) {
    const result: Record<string, string> = {};
    cookieHeader.split(';').forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        result[key] = value;
    });
    return result;
}

export { ProfilePage as default } from '../src/pages/profile';
