import {Divider, Collapse, theme} from 'antd'
import {useIntl, setLocale, useModel} from 'umi';
import React, {useEffect, useState} from 'react';
import {CaretRightOutlined} from '@ant-design/icons';
import type {CollapseProps} from 'antd';

export default () => {
    const intl = useIntl();
    const {token} = theme.useToken();
    const {data} = useModel('status');
    const [items, setItems] = useState<CollapseProps['items']>([]);

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
        if (!Array.isArray(data)) {
            const formattedItems = [
                {
                    key: '1',
                    label: 'Welcome',
                    children: 'Welcome Joined Our site',
                    style: panelStyle,
                },
                {
                    key: '2',
                    label: 'Upgrade your plan ',
                    children: 'Please upgrade your plan',
                    style: panelStyle,
                }]
            setItems(formattedItems);
        } else {
            const formattedItems = data?.map((item: any, index: number) => ({
                key: `${index + 1}`,
                label: item.label,
                children: <p>{item.content}</p>,
                style: panelStyle,
            }));
            setItems(formattedItems);
        }
    }, []);

    const panelStyle: React.CSSProperties = {
        marginBottom: 10,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'inbox'})}</div>
            <Divider/>
            {/* <div style={{textAlign: 'center', marginTop: '150px'}}>
                <Image
                    width={50}
                    src={MyInbox}
                    preview={false}
                />
                <div style={{
                    fontSize: '25px',
                    fontWeight: '500',
                    marginTop: '20px'
                }}>{intl.formatMessage({id: 'no_notification'})}</div>
            </div> */}
            <Collapse
                bordered={false}
                expandIcon={({isActive}) => <CaretRightOutlined
                    rotate={isActive ? 90 : 0}/>}
                style={{background: token.colorBgContainer}}
                items={items}
            />
        </div>
    );
}