import { ReactElement } from "react";
import { DefaultLayout } from "../../widgets/layouts/default";

export const GoodsPage = () => {
    return (
        <div>GoodsPage</div>
    )
}

GoodsPage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{ page }</DefaultLayout>;
};