import {
    DesktopOutlined,
    LaptopOutlined,
    LockOutlined,
    StarFilled,
    UserOutlined
} from '@ant-design/icons';
import {Button, Divider, Input, Card, Modal, message} from 'antd'
import {useEffect, useState} from 'react'
import {history, useModel, useIntl, setLocale} from 'umi'
import request from 'umi-request';

export default () => {
    const [open, setOpen] = useState(false);
    const {data} = useModel('status');
    const intl = useIntl();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (!data.logined) {
        history.push('/auth/signin');
    }
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

    const handleOk = () => {
        if (password !== confirmPassword) {
            message.error(intl.formatMessage({id: 'account.match_error'}));
            return;
        }
        request('/api/v1/password', {
            method: 'POST',
            data: {
                user_id: '12',
                password: '12312',
                locale: localStorage.getItem('locale')
            }
        }).then(response => {
            if (response && response.status === 'success') {
                message.success(response.message);
                setOpen(false);
            } else {
                message.error(response.message);
                setOpen(false);
            }
        });
    };

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'account'})}</div>
            <Divider/>
            <div style={{marginTop: '50px'}}>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Card style={{width: 400}}>
                        <div style={{fontSize: '20px'}}>dimitri888</div>
                        <div style={{display: 'flex', marginTop: '20px'}}>
                            <div
                                style={{
                                    marginRight: '5px',
                                    marginTop: '3px'
                                }}>{intl.formatMessage({id: 'login.password'})}:
                            </div>
                            <Input.Password/>
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '20px',
                            justifyContent: 'space-between'
                        }}>
                            <UserOutlined
                                style={{fontSize: '60px', color: '#1677ff'}}/>
                            <div
                                style={{
                                    fontSize: '18px',
                                    marginLeft: '20px',
                                    marginTop: '15px',
                                    color: '#1677ff',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    setOpen(true)
                                }}>{intl.formatMessage({id: 'account.change_password'})}
                            </div>
                        </div>
                    </Card>
                    <Card style={{width: 400}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'home.expired'})}</div>
                        <div style={{display: 'flex', marginTop: '20px'}}>
                            <div style={{
                                fontSize: '20px',
                                marginRight: '5px',
                                marginTop: '3px'
                            }}>0
                                min {intl.formatMessage({id: 'account.left'})}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '20px',
                            justifyContent: 'space-between'
                        }}>
                            <StarFilled
                                style={{fontSize: '60px', color: '#1677ff'}}/>
                            <div
                                style={{
                                    fontSize: '18px',
                                    marginLeft: '20px',
                                    marginTop: '15px',
                                    color: '#1677ff',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    history.push('/renew')
                                }}
                            >{intl.formatMessage({id: 'renew'})}
                            </div>
                        </div>
                    </Card>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '30px'
                }}>
                    <Card style={{width: 400}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'device1'})}:
                            ({intl.formatMessage({id: 'layout.current_device'})})
                        </div>
                        <div style={{display: 'flex', marginTop: '20px'}}>
                            <div
                                style={{
                                    marginRight: '5px',
                                    marginTop: '3px'
                                }}>ID: {data?.device_id ? data?.device_id : 102323123}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '20px',
                            justifyContent: 'space-between'
                        }}>
                            <DesktopOutlined
                                style={{fontSize: '60px', color: '#1677ff'}}/>
                            <div
                                style={{
                                    fontSize: '18px',
                                    marginLeft: '20px',
                                    marginTop: '15px',
                                    color: '#1677ff',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    history.push('/auth/signin')
                                }}>{intl.formatMessage({id: 'account.log_out'})}
                            </div>
                        </div>
                    </Card>
                    <Card style={{width: 400}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'device2'})}:
                            ({intl.formatMessage({id: 'lock'})})
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '80px',
                            justifyContent: 'space-between'
                        }}>
                            <LaptopOutlined
                                style={{fontSize: '60px', color: '#dfdfdf'}}/>
                        </div>
                    </Card>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '30px'
                }}>
                    <Card style={{width: 400}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'device3'})}:
                            ({intl.formatMessage({id: 'lock'})})
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '80px',
                            justifyContent: 'space-between'
                        }}>
                            <LockOutlined
                                style={{fontSize: '60px', color: '#dfdfdf'}}/>
                        </div>
                    </Card>
                    <Card style={{width: 400}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'device4'})}:
                            ({intl.formatMessage({id: 'lock'})})
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '80px',
                            justifyContent: 'space-between'
                        }}>
                            <LockOutlined
                                style={{fontSize: '60px', color: '#dfdfdf'}}/>
                        </div>
                    </Card>
                </div>
            </div>
            <Modal
                title={intl.formatMessage({id: 'account.change_password'})}
                centered
                open={open}
                onOk={() => setOpen(false)}
                width={600}
                footer={null}
                onCancel={() => setOpen(false)}
            >
                <div style={{
                    padding: '10px',
                    borderRadius: '5px',
                    margin: '0 20px 0 20px'
                }}>
                    {intl.formatMessage({id: 'login.password'})}: <Input.Password
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                    {intl.formatMessage({id: 'account.confirm'})}: <Input.Password
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '20px'
                }}>
                    <Button type='primary' style={{width: '250px'}}
                            onClick={handleOk}>{intl.formatMessage({id: 'account.change_password'})}</Button>
                    <Button style={{width: '250px'}}
                            onClick={() => setOpen(false)}> {intl.formatMessage({id: 'refer.cancel'})}</Button>
                </div>
            </Modal>
        </div>
    );
}