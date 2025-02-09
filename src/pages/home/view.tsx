import { ReactElement } from "react";
import { DefaultLayout } from "../../widgets/layouts/default";
import cl from './styles.module.scss'

export const HomePage = () => {
    return (
        <div className={ cl.home }>
            <div className={ cl.home__item }>
                <div className={ cl.home__itemPic } style={ { backgroundImage: "url('https://placard.bitdeals.org/storage/images/32770798667.jpg')" } }/>
                <div className={ `${cl.home__itemTitle} ${cl.home__itemTitleLeft}` }>Browse</div>
            </div>
            <div className={ cl.home__item }>
                <div className={ cl.home__itemPic } style={ { backgroundImage: "url('https://placard.bitdeals.org/storage/images/42012368589.jpg')" } }/>
                <div className={ `${cl.home__itemTitle} ${cl.home__itemTitleRight} ${cl.home__itemTitleMedium}` }>General</div>
            </div>
            <div className={ cl.home__item }>
                <div className={ cl.home__itemPic } style={ { backgroundImage: "url('https://placard.bitdeals.org/storage/images/5427709836.jpg')" } }/>
                <div className={ `${cl.home__itemTitle} ${cl.home__itemTitleTop} ${cl.home__itemTitleSmall}` }>General</div>
            </div>
            <div className={ cl.home__item }>
                <div className={ cl.home__itemPic } style={ { backgroundImage: "url('https://placard.bitdeals.org/storage/images/62867492943.jpg')" } }/>
                <div className={ `${cl.home__itemTitle} ${cl.home__itemTitleLeft} ${cl.home__itemTitleSmall}` }>Test</div>
            </div>
            <div className={ cl.home__item }>
                <div className={ cl.home__itemPic } style={ { backgroundImage: "url('https://placard.bitdeals.org/storage/images/73295044366.jpg')" } }/>
                <div className={ `${cl.home__itemTitle} ${cl.home__itemTitleLeft} ${cl.home__itemTitleSmall}` }>Test</div>
            </div>
        </div>
    );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{ page }</DefaultLayout>;
};
