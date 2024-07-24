import {hasNoLayout} from '@/defaults';
import useSession from '@/hooks/useSession';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {App, Button, ConfigProvider} from 'antd';
import {useEffect, useState} from 'react';
import {
    history,
    Link,
    Outlet,
    useLocation,
    useIntl,
    setLocale,
    useModel
} from 'umi';
import {
    ClockCircleTwoTone,
    DesktopOutlined,
    LaptopOutlined,
    RedoOutlined,
    UserOutlined
} from '@ant-design/icons';

const Container = () => {
    const location = useLocation();
    const intl = useIntl();
    const {data, refreshData} = useModel('status');
    const {session} = useSession();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [menu, setMenu] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [renew, setRenew] = useState('');
    const [expiretime, setExpireTime] = useState(Date);

    useEffect(() => {
        const locale = localStorage.getItem('locale');
        switch (locale) {
            case "en":
                setLocale('en-US');
                break;
            case "ch-si":
                setLocale('ch-SI');
                break;
            case "ru":
                setLocale('ru-RU');
                break;
            case 'zh-tw':
                setLocale('zh-TW');
                break;
            default:
                setLocale('en-US');
        }
    }, []);
    useEffect(() => {
        setIsLogin(data?.logined);
        setRenew(data?.plan?.name);

        const timestamp = data?.plan?.expire ? data?.plan?.expire : 1622419200;
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        setExpireTime(formattedDateTime);

    }, [refreshData]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    const menuItemRender = (item, dom) => <Link to={item.path}>{dom}</Link>;


    const menuFooterRender = () => {
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 30px'
                }}>
                    <Button type="primary" onClick={() => {
                        setMenu(true);
                        history.push('/renew');
                    }}>
                        {intl.formatMessage({id: 'renew'})}
                    </Button>
                    <Button
                        type="primary"
                        icon={<RedoOutlined/>}
                        loading={loadings[1]}
                        onClick={() => enterLoading(1)}
                        style={{
                            background: '#fff',
                            color: 'black',
                            marginTop: '20px'
                        }}
                    >
                        {intl.formatMessage({id: 'setup.version'})} : {data?.version?.current ? data?.version?.current : 3.06}
                    </Button>
                </div>
            </div>
        );
    };
    const menuPayFooterRender = () => {
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <Button type='primary' style={{width: '150px'}}
                            onClick={() => {
                                history.push('/home');
                                setMenu(false);
                            }}>{intl.formatMessage({id: 'layouts.back'})}</Button>
                </div>
                <div style={{textAlign: 'left'}}>
                    <p>{intl.formatMessage({id: 'layouts.expire_date'})}: <span
                        style={{color: 'blue'}}>2024-05-06 10:25:25</span></p>
                </div>
            </div>
        );
    }
    const menuHeaderRender = () => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '20px'
            }}>
                <span style={{
                    fontSize: "12px",
                    fontWeight: '500',
                    marginBottom: '30px'
                }}><DesktopOutlined
                    style={{
                        fontSize: '15px',
                        color: 'black',
                        marginRight: '5px'
                    }}/>LetsVPN (ID : {data?.device_id ? data?.device_id : 102323123})</span>
                <Link to={isLogin ? '/account' : '/auth'}
                      style={{color: '#000'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Button style={{
                            fontSize: '30px',
                            height: '50px',
                            width: '50px',
                            marginTop: '20px'
                        }}
                                shape="circle"><UserOutlined/></Button>
                        <div style={{marginLeft: '15px'}}>
                            <div style={{
                                marginTop: '20px',
                                fontSize: '18px'
                            }}> {isLogin ? 'dimitri' : intl.formatMessage({id: 'login.login'})}</div>
                            <div style={{
                                background: '#fff',
                                paddingRight: '28px',
                                paddingLeft: '5px'
                            }}>{renew ? intl.formatMessage({id: `renew.${renew}`}) : intl.formatMessage({id: 'home.expired'})}</div>
                        </div>
                    </div>
                    <div style={{
                        fontSize: '10px',
                        marginTop: '10px'
                    }}>{intl.formatMessage({id: 'home.expire_time'})} :
                        {expiretime ? expiretime : '2024-05-08 10:50:45'}
                    </div>
                </Link>
            </div>
        )
    };

    const menuPayHeaderRender = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '20px'
                }}>
                    <div style={{fontSize: '100px', textAlign: 'center'}}>
                        <LaptopOutlined/></div>
                    <div style={{
                        fontSize: '25px',
                        fontWeight: '500',
                        textAlign: 'center'
                    }}>{intl.formatMessage({id: 'layout.current_device'})}</div>
                    <div
                        style={{textAlign: 'center'}}>ID <span>{data?.device_id ? data?.device_id : 102323123}</span>
                    </div>
                </div>
                <div style={{marginTop: '100px', marginLeft: '20px'}}>
                    <div><ClockCircleTwoTone
                        style={{fontSize: '30px', marginBottom: '20px'}}/> <span
                        style={{
                            marginLeft: '10px',
                            fontSize: '20px'
                        }}>{intl.formatMessage({id: 'home.expired'})}</span>
                    </div>
                    <div><ClockCircleTwoTone style={{fontSize: '30px'}}/> <span
                        style={{
                            marginLeft: '10px',
                            fontSize: '20px'
                        }}>0 mins</span></div>
                </div>
            </div>
        )
    };
    const collapsedButtonRender = () => {
        // Return null to render no button
        return null;
    };

    return <App message={{maxCount: 1}}>
        <ConfigProvider>
            {!hasNoLayout.includes(location.pathname) && Boolean(session) &&
                <ProLayout
                    {...(!menu && sidebarMenu)}
                    layout={'side'}
                    fixSiderbar={true}
                    fixedHeader={false}
                    collapsed={false}
                    menuHeaderRender={menu ? menuPayHeaderRender : menuHeaderRender}
                    menuFooterRender={menu ? menuPayFooterRender : menuFooterRender}
                    collapsedButtonRender={collapsedButtonRender}
                    location={{
                        pathname: location.pathname
                    }}
                    menuItemRender={menuItemRender}
                    siderMenuType={'group'}
                    menu={{
                        collapsedShowGroupTitle: false
                    }}>
                    <Outlet context={{
                        session
                    }}/>
                </ProLayout>
            }
            {hasNoLayout.includes(document.location.pathname) && !session &&
                <Outlet/>}
        </ConfigProvider>
    </App>;
};
export default Container;
