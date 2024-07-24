import {
    Button,
    Divider,
    Radio,
    Switch,
    Space,
    Select,
    notification,
    message
} from 'antd'
import {
    ControlOutlined,
    ExclamationCircleOutlined,
    PoweroffOutlined,
    RedoOutlined,
    TranslationOutlined
} from '@ant-design/icons'
import type {RadioChangeEvent} from 'antd'
import {useEffect, useState} from 'react'
import request from 'umi-request'
import {useIntl, setLocale, useModel, Link} from 'umi'

export default () => {
    const intl = useIntl();
    const {data, refreshData} = useModel('status');
    const [value, setValue] = useState(1);
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const locale = localStorage.getItem('locale');
    const [turnOn, setTurnOn] = useState(false);

    useEffect(() => {
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
        setValue(data?.dns);
        setTurnOn(data?.auto_connect);
    }, [refreshData]);

    const enterLoading = (index: number): void => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                notification.open({
                    message: intl.formatMessage({id: 'setup.check_update'}),
                    description: intl.formatMessage({id: 'setup.desc'})
                });
                return newLoadings;
            });
        }, 3000);
    };

    const onChange = (e: RadioChangeEvent): void => {
        setValue(e.target.value);

        request('/api/v1/dns', {
            method: 'POST',
            data: {
                config: value,
                locale: locale
            }
        }).then(response => {
            if (response && response.status === 'success') {
                message.success(intl.formatMessage({id: 'network.success'}));

            } else {
                message.error(intl.formatMessage({id: 'network.error1'}));
            }
        });
    };

    const handleAuto = (checked: any): void => {
        if (checked) {
            setTurnOn(true);
        } else {
            setTurnOn(false);
        }
        request('/api/v1/auto', {
            method: 'POST',
            data: {
                auto: checked,
                locale: locale
            }
        }).then(response => {
            if (response && response.status === 'success') {
                message.success(response.message);
                refreshData()
            } else {
                message.error(response.message);
            }
        });
    }

    const setDataToLocalStorage = (key: string, value: any): void => {
        localStorage.setItem(key, value);
    };
    const handleLocalChange = (value: any): void => {
        setDataToLocalStorage('locale', value);
        switch (value) {
            case "en":
                setLocale('en-US');
                break;
            case "ch-si":
                setLocale('ch-SI');
                break;
            case "ru":
                setLocale('ru-RU');
                break;
            case 'ch-tr':
                setLocale('ch-tr');
                break;
            default:
                setLocale('en-US');
        }
    };

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'setup'})}</div>
            <Divider/>
            <div>
                <p style={{fontSize: '20px'}}>
                    <PoweroffOutlined/> {intl.formatMessage({id: 'setup.auto_start_on_boot'})}
                </p>
                <div style={{display: 'flex'}}>
                    <p>{intl.formatMessage({id: 'setup.auto_start_on_boot_description'})}</p>
                    <div style={{display: 'flex', marginLeft: '50px'}}>
                        <Switch defaultChecked onChange={handleAuto}
                                value={turnOn}/>
                        <div style={{marginLeft: '10px'}}>
                            {turnOn ? intl.formatMessage({id: 'setup.turn_on'}) : intl.formatMessage({id: 'setup.shut_down'})}
                        </div>
                    </div>
                </div>
            </div>
            <Divider/>
            <div>
                <p style={{fontSize: '20px'}}>
                    <TranslationOutlined/> {intl.formatMessage({id: 'setup.display_language'})}
                </p>
                <Select
                    defaultValue="system"
                    value={locale}
                    style={{width: 180}}
                    onChange={handleLocalChange}
                    options={[
                        {value: 'system', label: 'Follow the system'},
                        {value: 'en', label: 'English'},
                        {value: 'ch-si', label: '中文简体'},
                        {value: 'zh-tw', label: '中文繁體'},
                        {value: 'ru', label: 'Русский'},
                    ]}
                />
            </div>
            <Divider/>
            <div>
                <p style={{fontSize: '20px'}}>
                    <ControlOutlined/> {intl.formatMessage({id: 'setup.dns_settings'})}
                </p>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio
                                value={1}>{intl.formatMessage({id: 'setup.configuration1'})}</Radio>
                            <Radio
                                value={2}>{intl.formatMessage({id: 'setup.configuration2'})}</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
            <Divider/>
            <div>
                <p style={{fontSize: '20px'}}>
                    <ExclamationCircleOutlined/> {intl.formatMessage({id: 'setup.about_us'})}
                </p>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Button type="primary">
                            {intl.formatMessage({id: 'setup.version'})} : {data?.version?.current ? data?.version?.current : 3.06}
                        </Button>
                        <Button
                            type="primary"
                            icon={<RedoOutlined/>}
                            loading={loadings[1]}
                            style={{
                                background: '#fff',
                                color: 'black',
                                marginLeft: '20px'
                            }}
                            onClick={() => enterLoading(1)}>
                            {intl.formatMessage({id: 'setup.check_update'})}
                        </Button>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <Link
                            to="/policy">{intl.formatMessage({id: 'setup.privacy_policy'})}</Link>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <Link
                            to="/terms">{intl.formatMessage({id: 'setup.terms_of_service'})}</Link>
                    </div>
                    <div
                        style={{marginTop: '10px'}}>{intl.formatMessage({id: 'setup.all_rights_reserved_term'})}</div>
                </div>
            </div>
        </div>
    );
}