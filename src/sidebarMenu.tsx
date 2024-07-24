import {HomeOutlined, BellOutlined, GiftOutlined, CreditCardOutlined, GlobalOutlined, SettingOutlined, DesktopOutlined, UserOutlined} from '@ant-design/icons';
import { FormattedMessage } from 'umi'

const sidebarMenu = {
    route: {
        path: '/',
        routes: [
            {
                path: '/home',
                icon: <HomeOutlined />,
                name: <FormattedMessage id='home' />
            },
            {
                path: '/network',
                icon: <GlobalOutlined />,
                name: <FormattedMessage id='network' />
            },
            {
                path: '/refer',
                icon: <GiftOutlined />,
                name: <FormattedMessage id='refer' />
            },
            {
                path: '/membership',
                icon: <CreditCardOutlined />,
                name: <FormattedMessage id='membership' />
            },
            {
                path: '/inbox',
                icon: <BellOutlined />,
                name: <FormattedMessage id='inbox' />
            },
            {
                path: '/setup',
                icon: <SettingOutlined />,
                name: <FormattedMessage id='setup' />
            }
        ]
    }
};
export default sidebarMenu;