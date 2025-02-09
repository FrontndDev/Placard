import {useGate, useUnit} from 'effector-react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/router';
import {Fragment, ReactElement, ReactNode} from 'react';
import { navigationModel } from '../shared/navigation';
import {withProviders} from "./providers";
import Head from "next/head";
import {sessionModel} from "../entities/session";

const openSans = Open_Sans({
    weight: 'variable',
    subsets: ['latin'],
});

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
    P,
    IP
> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);

    const [pending] = useUnit([sessionModel.$pending]);

    useGate(navigationModel.RouterGate, { router });

    return (
        <Fragment>
            <Head>
                <title>Placard</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </Head>
            <div className={openSans.className}>
                {getLayout(<Component {...pageProps} />)}
            </div>
        </Fragment>
    );
};

export default withProviders(App);
