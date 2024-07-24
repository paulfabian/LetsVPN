import {Button, Image, Divider} from 'antd'
import MyLoginLogo from '../../assets/login.svg';
import {Link, useIntl, setLocale} from 'umi';
import {useEffect} from 'react';

export default () => {
    const intl = useIntl();
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

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'auth'})}</div>
            <Divider/>
            <div style={{textAlign: 'center', marginTop: '100px'}}>
                <Image
                    width={200}
                    src={MyLoginLogo}
                    preview={false}
                />
                <div style={{
                    fontSize: '15px',
                    marginTop: '10px'
                }}>{intl.formatMessage({id: 'auth.description'})}</div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Link to={'/auth/signup'}>
                        <Button style={{
                            marginTop: '20px',
                            width: '150px',
                            height: '40px',
                            fontSize: '15px'
                        }}>{intl.formatMessage({id: 'register.register'})}</Button>
                    </Link>
                    <Link to="/auth/signin">
                        <Button type="primary" style={{
                            marginTop: '20px',
                            width: '150px',
                            height: '40px',
                            fontSize: '15px'
                        }}>{intl.formatMessage({id: 'login.login'})}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}