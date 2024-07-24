import {Button, Divider, Input, message} from 'antd'
import {useEffect, useState} from 'react'
import request from 'umi-request'
import {history, useIntl, setLocale} from 'umi';

export default () => {
    const intl = useIntl();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        invite_code: ''
    });
    const locale = localStorage.getItem('locale');
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

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleFormSubmit = async () => {
        try {
            const response = await request('/api/v1/register', {
                method: 'post',
                data: formData,
                locale: locale
            });
            const {status, message: responseMessage} = response;
            if (status === 'success') {
                history.push('/auth/signin');
                message.success(responseMessage);
            } else {
                message.error(responseMessage);
            }
        } catch (error) {
            message.error("Error");
        }
    };

    return (
        <div>
            <div>
                <div style={{
                    fontSize: '30px',
                    fontWeight: '500'
                }}>{intl.formatMessage({id: 'register'})}</div>
                <Divider/>
                <div>
                    <div
                        style={{fontSize: '20px'}}>{intl.formatMessage({id: 'register.description'})}</div>
                </div>
                <div style={{marginTop: '20px'}}>
                    <div>
                        <div>{intl.formatMessage({id: 'login.username'})}</div>
                        <Input
                            name='username'
                            placeholder={intl.formatMessage({id: 'login.username'})}
                            style={{width: '300px'}}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <div>{intl.formatMessage({id: 'login.password'})}</div>
                        <Input.Password
                            name="password"
                            placeholder={intl.formatMessage({id: 'login.password'})}
                            style={{width: '300px'}}
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <div>{intl.formatMessage({id: 'register.invite_code'})}</div>
                        <Input
                            name="invite_code"
                            placeholder={intl.formatMessage({id: 'register.invite_code'})}
                            style={{width: '300px'}}
                            value={formData.invite_code}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button
                        type="primary"
                        style={{
                            marginTop: '30px',
                            width: '300px',
                            fontSize: '15px'
                        }}
                        onClick={handleFormSubmit}
                    >{intl.formatMessage({id: 'register.register'})}</Button>
                </div>
                <div style={{marginTop: '20px', display: 'flex'}}>
                    <div>{intl.formatMessage({id: 'register.already_have_an_account'})}</div>
                    <div style={{marginLeft: '20px'}}>
                        <a href='/#/auth/signin'>{intl.formatMessage({id: 'register.take_me_to_login'})}</a>
                    </div>
                </div>
            </div>
            <div style={{
                textAlign: "right",
                position: 'absolute',
                bottom: 0,
                right: 100
            }}>{intl.formatMessage({id: 'register.description2'})}
                <a>{intl.formatMessage({id: 'register.terms'})}</a>
            </div>
        </div>
    );
}