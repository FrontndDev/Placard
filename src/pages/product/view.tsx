import { ReactElement } from "react";
import { DefaultLayout } from "../../widgets/layouts/default";
import { ProfilePage } from "../profile";

export const ProductPage = () => {
    <div>ProductPage</div>
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{ page }</DefaultLayout>;
};