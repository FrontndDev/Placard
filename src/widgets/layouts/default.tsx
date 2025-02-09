import type { FC, ReactNode } from 'react';
import {Container, Flex} from "@mantine/core";
import { Header } from '../nav/header';

interface HomeLayoutProps {
    children: ReactNode;
}

export const DefaultLayout: FC<HomeLayoutProps> = ({
                                                    children,
                                                }) => {
    return (
        <Flex direction={'column'}>
                    <Header />
                    <main>
                        <Container w={'100%'} size={'lg'} px={'xl'}>
                            {children}
                        </Container>
                    </main>
        </Flex>
    );
};
