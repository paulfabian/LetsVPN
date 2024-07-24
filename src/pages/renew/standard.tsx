import {AlipayCircleOutlined, CreditCardOutlined} from "@ant-design/icons"
import {Button, Divider, Radio} from "antd"
import {useEffect, useState} from "react"
import {setLocale, useIntl} from 'umi'

export default () => {
    const intl = useIntl();
    const [amount, setAmount] = useState(0);
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

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '15px'
            }}>
                <div
                    style={{
                        border: '1px solid #1677ff',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}
                    onClick={() => {
                        setAmount(53.99)
                    }}>
                    <div style={{padding: '15px'}}>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: '500'
                        }}>12 {intl.formatMessage({id: 'renew.months'})}</div>
                        <div style={{
                            fontSize: '25px',
                            fontWeight: '500',
                            color: '#1677ff'
                        }}>USD 49.99
                        </div>
                        <div style={{fontSize: '15px'}}>USD
                            0.15/{intl.formatMessage({id: 'renew.Day'})}</div>
                    </div>
                    <div style={{
                        fontSize: '15px',
                        background: 'red',
                        color: 'white'
                    }}>+
                        30-90 {intl.formatMessage({id: 'renew.days'})}</div>
                </div>
                <div
                    style={{
                        border: '1px solid #1677ff',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}
                    onClick={() => {
                        setAmount(15.49)
                    }}>
                    <div style={{padding: '15px'}}>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: '500'
                        }}>3 {intl.formatMessage({id: 'renew.months'})}</div>
                        <div style={{
                            fontSize: '25px',
                            fontWeight: '500',
                            color: '#1677ff'
                        }}>USD 12.49
                        </div>
                        <div style={{fontSize: '15px'}}>USD
                            0.15/{intl.formatMessage({id: 'renew.Day'})}</div>
                    </div>
                    <div style={{
                        fontSize: '15px',
                        background: 'red',
                        color: 'white'
                    }}>+
                        15-30 {intl.formatMessage({id: 'renew.days'})}</div>
                </div>
                <div
                    style={{
                        border: '1px solid #1677ff',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}
                    onClick={() => {
                        setAmount(6.69)
                    }}>
                    <div style={{padding: '15px'}}>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: '500'
                        }}>1 {intl.formatMessage({id: 'renew.months'})}</div>
                        <div style={{
                            fontSize: '25px',
                            fontWeight: '500',
                            color: '#1677ff'
                        }}>USD 4.49
                        </div>
                        <div style={{fontSize: '15px'}}>USD
                            0.15/{intl.formatMessage({id: 'renew.Day'})}</div>
                    </div>
                    <div style={{
                        fontSize: '15px',
                        background: 'red',
                        color: 'white'
                    }}>+
                        7-15 {intl.formatMessage({id: 'renew.days'})}</div>
                </div>
                <div
                    style={{
                        border: '1px solid #1677ff',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}
                    onClick={() => {
                        setAmount(2.99)
                    }}>
                    <div style={{padding: '15px'}}>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: '500'
                        }}>1 {intl.formatMessage({id: 'renew.weeks'})}</div>
                        <div style={{
                            fontSize: '25px',
                            fontWeight: '500',
                            color: '#1677ff'
                        }}>USD 1.99
                        </div>
                        <div style={{fontSize: '15px'}}>USD
                            0.15/{intl.formatMessage({id: 'renew.Day'})}</div>
                    </div>
                    <div style={{
                        fontSize: '15px',
                        background: 'red',
                        color: 'white'
                    }}>+
                        3-7 {intl.formatMessage({id: 'renew.days'})}</div>
                </div>
            </div>
            <div style={{marginTop: '20px'}}>
                <p>{intl.formatMessage({id: 'renew.payment_method'})} : </p>
                <div>
                    <Radio.Group>
                        <Radio.Button
                            value="ali"
                            style={{
                                fontSize: '25px',
                                height: '35px'
                            }}><AlipayCircleOutlined/> Alipay</Radio.Button>
                        <Radio.Button
                            value="bank"
                            style={{
                                fontSize: '25px',
                                height: '35px'
                            }}><CreditCardOutlined/> BankCard</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <Divider/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>{intl.formatMessage({id: 'renew.total'})}:
                    <span style={{
                        color: '#c41d7f',
                        fontSize: '25px'
                    }}>USD {amount}</span>
                </div>
                <Button type="primary"
                        style={{width: '300px'}}>{intl.formatMessage({id: 'renew.pay'})}</Button>
            </div>
        </div>
    );
}