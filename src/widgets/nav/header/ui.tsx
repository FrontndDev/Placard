import Link from "next/link";
import {
    Anchor,
    Autocomplete,
    Burger,
    Button,
    Container,
    Divider,
    Flex,
    Input,
    Menu,
    Select
} from "@mantine/core";
import {IconLogout, IconSearch} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useUnit } from "effector-react";
import { sessionModel } from "../../../entities/session";
import classes from "./styles.module.scss";

const MAIN_LINKS = [
    { link: "/profile", label: "Profile" },
    { link: "/messages", label: "Messages" },
    { link: "/inventory", label: "Inventory" },
    { link: "/deals", label: "Deals" },
];

const MainNavigation = ({ links }: { links: typeof MAIN_LINKS}) => {
    const router = useRouter();

    return (
        <>
            {links.map((item) => (
                <Link
                    href={item.link}
                    key={item.label}
                    className={classes.mainLink}
                    data-active={router.pathname === item.link || undefined}
                >
                    {item.label}
                </Link>
            ))}
        </>
    );
};

export const Header = () => {
    const [opened, { toggle }] = useDisclosure();
    const router = useRouter();

    const [isLogged, logOut, hasRefreshToken] = useUnit([
        sessionModel.$isLogged,
        sessionModel.logOut,
        sessionModel.$hasRefreshToken,
    ]);

    return (
        <Flex bg={"#f1f3f5"} w={"100%"} direction={"column"}>
            <Container w={"100%"} size={"lg"} px={"xl"}>
                <Flex
                    w={"100%"}
                    align={"center"}
                    justify={"space-between"}
                    h="60px"
                >
                    {!isLogged ? (
                        <Flex direction={"row"} gap={"xl"}>
                            <Anchor
                                size={"sm"}
                                style={{ textDecoration: "none" }}
                                onClick={() => router.push("/auth")}
                            >
                                Sign in
                            </Anchor>
                            <Anchor
                                size={"sm"}
                                style={{ textDecoration: "none" }}
                                onClick={() => router.push("/auth")}
                            >
                                Sign up
                            </Anchor>
                        </Flex>
                    ) : (
                        <Flex>
                            <MainNavigation links={MAIN_LINKS} />
                        </Flex>
                    )}

                    {isLogged ? (
                        <Button
                            onClick={logOut}
                            variant={"transparent"}
                            radius={"md"}
                            rightSection={<IconLogout size={14} />}
                        >
                            Logout
                        </Button>
                    ) : (
                        !hasRefreshToken && (
                            <Autocomplete
                                radius="md"
                                w={"200px"}
                                placeholder="Choose your country"
                                data={[
                                    "Belarus",
                                    "Russia",
                                    "France",
                                    "Poland",
                                    "USA",
                                ]}
                            />
                        )
                    )}
                </Flex>
            </Container>

            <Divider />

            <Container w={"100%"} size={"lg"} px={"xl"}>
                <Flex
                    w={"100%"}
                    gap={"xl"}
                    align={"center"}
                    justify={"space-between"}
                    h="60px"
                >
                    <Anchor
                        onClick={() => router.push("/")}
                        fw={"600"}
                        style={{
                            fontSize: "30px",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        PLACARD
                    </Anchor>
                    <Menu opened={opened} onChange={toggle} shadow="md" width={200}>
                        <Menu.Target>
                            <Burger
                                opened={opened}
                                size={"sm"}
                                aria-label="Toggle navigation"
                            />
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>Transfer my data</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <Flex w={"100%"} direction={"row"} gap={"sm"}>
                        <Input
                            radius="md"
                            w={"100%"}
                            placeholder='Search: goods, City, +/-"phrase"'
                            leftSection={<IconSearch size={16} />}
                        />
                        <Select
                            radius="md"
                            w={"100%"}
                            placeholder="All categories"
                            data={["React", "Angular", "Vue", "Svelte"]}
                        />
                        <Button radius="md" w={"200px"}>
                            Search
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Flex>
    );
};
