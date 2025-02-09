import {
    Anchor,
    Button,
    Text,
    Checkbox,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Flex
} from "@mantine/core";
import {upperFirst, useToggle} from "@mantine/hooks";
import {useForm} from "@effector-reform/react";
import {authPageModel} from "./model";
import {ReactElement} from "react";
import {DefaultLayout} from "../../widgets/layouts/default";

export const AuthPage = () => {
    const [type, toggle] = useToggle(['sign in', 'sign up']);
    const {values, fields, onSubmit, errors} = useForm(authPageModel.form)

    return (
        <Flex direction={'column'} justify={'center'} align={'center'} style={{ height: "calc(100dvh - 300px)" }}>
            <Paper radius="md" p="xl" h={'auto'} w={'450px'} withBorder>
                <Text size="lg" fw={500}>
                    {upperFirst(type)}
                </Text>

                <Divider labelPosition="center" my="lg" />

                <form onSubmit={onSubmit}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                radius="md"
                            />
                        )}

                        <TextInput
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={values.email}
                            error={errors.email}
                            onChange={(e) => fields.email.onChange(e.target.value)}
                            radius="md"
                        />

                        <PasswordInput
                            label="Password"
                            value={values.password}
                            error={errors.password}
                            onChange={(e) => fields.password.onChange(e.target.value)}
                            placeholder="Your password"
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Flex>
    )
}

AuthPage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};
