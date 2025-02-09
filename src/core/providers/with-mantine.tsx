import type { AppProps, AppType } from 'next/app';
import {theme} from "../../../theme";
import {MantineProvider} from "@mantine/core";

export const withMantine = (Component: AppType) => (props: AppProps) => {
    return (
        <MantineProvider theme={theme}>
            <Component {...props} />
        </MantineProvider>
    );
};
