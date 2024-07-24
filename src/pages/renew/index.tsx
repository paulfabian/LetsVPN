import {Divider, Tabs} from 'antd'
import {QuestionCircleOutlined} from '@ant-design/icons'
import type {TabsProps} from 'antd'
import Platinum from './platinum'
import Standard from './standard'
import {setLocale, useIntl} from 'umi'
import {useEffect} from 'react'
import './Renew.css'

export default () => {
    const intl = useIntl();
    useEffect(() => {
        switch (localStorage.getItem('locale')) {
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
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: intl.formatMessage({id: 'renew.platinum'}),
            icon: <QuestionCircleOutlined/>,
            children: <Platinum/>,
        },
        {
            key: '2',
            label: intl.formatMessage({id: 'renew.standard'}),
            icon: <QuestionCircleOutlined/>,
            children: <Standard/>,
        }
    ];

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'renew'})}</div>
            <Divider/>
            <Tabs defaultActiveKey="1" items={items} size='large'/>
        </div>
    );
}