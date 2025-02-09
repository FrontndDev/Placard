import {Button, Container, Title, Text, Center, Flex} from '@mantine/core';
import Link from 'next/link';
import {ReactElement} from "react";
import {DefaultLayout} from "../src/widgets/layouts/default";

export default function Custom404() {
  return (
      <Container size={'lg'}>
        <Flex direction={'column'} gap={'md'} justify={'center'} align={'center'} style={{ height: 'calc(100dvh - 300px)' }}>
            <Title order={1} size="h1">
                Not found
            </Title>
            <Text size="sm">
                Oops! The page you are looking for does not seem to exist.
            </Text>
            <Link href="/">
                <Button variant='outline' radius="md" size="md" mt={20}>
                    Go back to Home
                </Button>
            </Link>
        </Flex>
      </Container>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
