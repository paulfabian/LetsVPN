import {Button, Divider, Input, message} from 'antd'
import {useEffect, useState} from 'react'
import {history, useIntl, setLocale} from 'umi';

export default () => {
    const intl = useIntl();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleLogin = () => {
        fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                locale: localStorage.getItem('locale')
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    history.push('/account');
                    message.success(data.message);
                } else {
                    message.error(data.message);
                }
            })
            .catch(() => {
                message.error('Error');
            });
    };

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'login'})}</div>
            <Divider/>
            <div>
                <div
                    style={{fontSize: '20px'}}>{intl.formatMessage({id: 'login.description'})}</div>
            </div>
            <div style={{marginTop: '20px'}}>
                <div>
                    <div>{intl.formatMessage({id: 'login.username'})}</div>
                    <Input
                        placeholder={intl.formatMessage({id: 'login.username'})}
                        style={{width: '300px'}}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div style={{marginTop: '20px'}}>
                    <div>{intl.formatMessage({id: 'login.password'})}</div>
                    <Input.Password
                        placeholder={intl.formatMessage({id: 'login.password'})}
                        style={{width: '300px'}}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    type="primary"
                    style={{
                        marginTop: '30px',
                        width: '300px',
                        fontSize: '15px'
                    }}
                    onClick={handleLogin}
                >
                    {intl.formatMessage({id: 'login.login'})}
                </Button>
            </div>
            <div style={{marginTop: '20px', display: 'flex'}}>
                <div> {intl.formatMessage({id: 'login.not_account'})}</div>
                <div style={{marginLeft: '120px'}}>
                    <a href='#/auth/signup'>{intl.formatMessage({id: 'login.register_now'})}</a>
                </div>
            </div>
        </div>
    );
}