import {useState, useEffect} from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {Button, Input, Divider, message} from 'antd';
import request from 'umi-request';
import {useIntl, setLocale, Link, useModel} from 'umi';
import styles from './CircularButton.module.css';
import disconnect0 from '../../assets/disconnect.svg';
import disconnect1 from '../../assets/disconnect-0.svg';
import disconnect2 from '../../assets/disconnect-1.svg';
import disconnect3 from '../../assets/disconnect-2.svg';
import disconnect4 from '../../assets/disconnect-3.svg';
import rocket from '../../assets/rocket.svg';

const images = [disconnect0, disconnect1, disconnect2, disconnect3, disconnect4];

export default () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const intl = useIntl();
    // const { data, refreshData } = useModel('status');
    const locale = localStorage.getItem('locale');

    const {
        connected,
        setConnected,
        region,
        setRegion,
        renew,
        setRenew,
        daysRemaining,
        setDaysRemaining
    } = useModel('globalState');

    useEffect(() => {
        switch (locale) {
            case 'en':
                setLocale('en-US');
                break;
            case 'ch-si':
                setLocale('ch-SI');
                break;
            case 'ru':
                setLocale('ru-RU');
                break;
            case 'zh-tw':
                setLocale('zh-TW');
                break;
            default:
                setLocale('en-US');
        }
    }, [locale]);

    // useEffect(() => {
    //     const timestamp = data?.plan?.expire || 1722419200;

    //     const calculateDaysRemaining = () => {
    //         const currentTimestamp = Date.now() / 1000;
    //         let secondsInDay = 24 * 60 * 60;
    //         const timeDifference = timestamp - currentTimestamp;

    //         if (timeDifference < 24 * 60 * 60) {
    //             secondsInDay = 60 * 60;
    //         } else if (timeDifference < 60 * 60) {
    //             secondsInDay = 60;
    //         }
    //         const daysDifference = Math.ceil(timeDifference / secondsInDay);
    //         setDaysRemaining(daysDifference);
    //     };

    //     calculateDaysRemaining();
    //     const timer = setInterval(calculateDaysRemaining, 1000);
    //     return () => clearInterval(timer);
    // }, [data, setDaysRemaining]);

    // useEffect(() => {
    //     setRegion(data.node_id);
    //     setRenew(data?.plan?.name);
    // }, [data, setRegion, setRenew]);

    useEffect(() => {
        let intervalId;
        if (buttonDisabled) {
            intervalId = setInterval(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 1000);
        } else {
            setImageIndex(0);
        }
        return () => clearInterval(intervalId);
    }, [buttonDisabled]);

    const handleLetsGoClick = async () => {
        try {
            setButtonDisabled(true);
            setImageIndex(4);
            const res = await request('/api/v1/connect', {method: 'POST'});
            if (res.status === 'success') {
                setConnected(true);
            }
        } catch (error) {
            message.error('Error');
        } finally {
            setButtonDisabled(false);
        }
    };

    const handleDisconnectClick = async () => {
        try {
            const res = await request('/api/v1/disconnect', {method: 'POST'});
            if (res.status === 'success') {
                setConnected(false);
            }
        } catch (error) {
            message.error('Error');
        }
    };

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'home'})}</div>
            <Divider/>
            <Link
                to='/renew'
                onClick={() => {
                    localStorage.setItem('renew', 'true');
                }}
            >
                <p style={{textAlign: 'right', fontSize: '15px'}}>
                    {renew ? intl.formatMessage({id: `renew.${renew}`}) : intl.formatMessage({id: 'home.expired'})}
                    {intl.formatMessage({id: 'home.remaining_time'})}
                    <ShoppingCartOutlined/>
                </p>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Input placeholder='0'
                           style={{width: '35px', marginLeft: '5px'}} disabled/>
                    <Input placeholder='0'
                           style={{width: '35px', marginLeft: '5px'}} disabled/>
                    <Input placeholder='0'
                           style={{width: '35px', marginLeft: '5px'}} disabled/>
                    <Input placeholder='0'
                           style={{width: '35px', marginLeft: '5px'}} disabled/>
                </div>
            </Link>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
                <div className={styles.circularButton}>
                    <Button
                        type='primary'
                        shape='circle'
                        style={{
                            background: '#fff',
                            border: connected ? '1px solid #1677ff' : '1px solid #cf3665',
                            width: '150px',
                            height: '150px',
                        }}
                        onClick={handleLetsGoClick}
                        disabled={buttonDisabled}
                    >
                        <img src={connected ? rocket : images[imageIndex]}
                             style={{width: '100px'}}
                             alt={`disconnect-${imageIndex}`}/>
                    </Button>
                </div>
                <div style={{marginLeft: '50px', textAlign: 'center'}}>
                    <div style={{fontSize: '30px', fontWeight: '500'}}>
                        {connected ? intl.formatMessage({id: 'home.vpn_connected'}) : buttonDisabled ? intl.formatMessage({id: 'home.vpn_connecting'}) : intl.formatMessage({id: 'home.vpn_disconnected'})}
                    </div>
                    <p style={{fontSize: '15px'}}>{intl.formatMessage({id: 'home.region'})}: {region}</p>
                    <Button
                        type='primary'
                        danger
                        style={{
                            background: connected ? '#1677ff' : buttonDisabled ? '#7d7272' : '#cf3665',
                            color: '#fff',
                            width: '270px',
                            height: '40px',
                            fontSize: '15px',
                        }}
                        disabled={buttonDisabled}
                        onClick={connected ? handleDisconnectClick : handleLetsGoClick}
                    >
                        {connected ? intl.formatMessage({id: 'home.lets_stop'}) : buttonDisabled ? intl.formatMessage({id: 'home.vpn_connecting'}) : intl.formatMessage({id: 'home.lets_go'})}
                    </Button>
                </div>
            </div>
        </div>
    );
};
