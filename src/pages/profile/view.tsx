import {ReactElement} from "react";
import {DefaultLayout} from "../../widgets/layouts/default";
import {useUnit} from "effector-react";
import {profileModel} from "../../entities/profile";
import {Box, Flex, LoadingOverlay, Tabs, TextInput, Text, Textarea, Button} from "@mantine/core";

export const ProfilePage = () => {
    const [profile] = useUnit([profileModel.$profile])

    return (
        <Flex mt={'xl'}>
            <Tabs w={'100%'} defaultValue="common">
                <Tabs.List mb={'xl'}>
                    <Tabs.Tab value="common">
                        Common
                    </Tabs.Tab>
                    <Tabs.Tab value="delivery">
                        Delivery
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="common">
                    <form>
                        <Flex direction={'column'} gap={'60px'} mb={100} w={'100%'}>
                            <Flex w={'auto'} direction={'column'} gap={'lg'}>
                                <Text size={'24px'} fw={600}>My profile</Text>
                                <TextInput
                                    radius={'md'}
                                    variant="filled"
                                    w={'50%'} value={profile?.display_name} onChange={() => {}} label="Display Name" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Username" description={'This will be used as your profile page URL'} />
                                <Textarea variant="filled" radius={'md'} w={'50%'} value={profile?.bio} onChange={() => {}} label="Bio" />
                            </Flex>
                            <Flex w={'auto'} direction={'column'} gap={'lg'}>
                                <Text size={'24px'} fw={600}>Private information
                                </Text>
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Email/Bitmessage Address" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.bitcoin_address} onChange={() => {}} label="Bitcoin Address" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.currency} onChange={() => {}} label="Currency" />
                            </Flex>
                            <Flex w={'auto'} direction={'column'} gap={'lg'}>
                                <Text size={'24px'} fw={600}>Default Shipping address

                                </Text>
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Full Name" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Phone" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Address" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.city} onChange={() => {}} label="City" description={'This will be used for filter IntraCity delivery goods.'} />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="State" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Post code/Zip" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.country} onChange={() => {}} label="Country" />
                            </Flex>
                            <Flex w={'auto'} direction={'column'} gap={'lg'}>
                                <Text size={'24px'} fw={600}>New Password


                                </Text>
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.password} onChange={() => {}} label="Password" />
                                <TextInput variant="filled" radius={'md'} w={'50%'} value={profile?.display_name} onChange={() => {}} label="Confirm password" />
                            </Flex>
                            <Button w={'fit-content'} size={'md'} radius={'md'}>Save profile</Button>
                        </Flex>
                    </form>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    Messages tab content
                </Tabs.Panel>
            </Tabs>
        </Flex>
    )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};
