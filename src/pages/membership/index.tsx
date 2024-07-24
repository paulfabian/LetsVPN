import {Button, Image, Divider, Card, Modal} from 'antd'
import {useIntl, setLocale, history, useModel} from 'umi';
import {useEffect, useState} from 'react';
import MyMember from '../../assets/member.svg'

export default () => {
    const intl = useIntl();
    const {data} = useModel('status');
    const [open, setOpen] = useState(false);
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
            }}>{intl.formatMessage({id: 'membership'})}</div>
            <Divider/>
            <div style={{textAlign: 'center'}}>
                <Image
                    width={200}
                    src={MyMember}
                    preview={false}
                />
                <div style={{
                    fontSize: '25px',
                    fontWeight: '500'
                }}>{intl.formatMessage({id: 'membership'})}</div>
                <div style={{fontSize: '15px', marginTop: '10px'}}>
                    {intl.formatMessage({id: 'membership.description'})}
                </div>
                <Button
                    type="primary"
                    style={{
                        marginTop: '20px',
                        width: '270px',
                        height: '40px',
                        fontSize: '15px'
                    }}
                    onClick={() => {
                        setOpen(true)
                    }}>
                    {intl.formatMessage({id: 'membership.try_my_luck'})}
                </Button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
            }}>
                <Card style={{marginRight: '10px', padding: '10px'}}>
                    <div
                        style={{fontSize: '20px'}}>{intl.formatMessage({id: 'membership.today_lucky_stars'})}</div>
                    <div style={{
                        color: '#1677ff',
                        fontSize: '25px',
                        fontWeight: '500'
                    }}>{data?.today_lucky_stars ? data?.today_lucky_stars : 3556} {intl.formatMessage({id: 'refer.ppl'})}</div>
                </Card>
                <Card style={{marginLeft: '10px', padding: '10px'}}>
                    <div
                        style={{fontSize: '20px'}}>{intl.formatMessage({id: 'membership.accumulated_number'})}</div>
                    <div style={{
                        color: '#1677ff',
                        fontSize: '25px',
                        fontWeight: '500'
                    }}>{data?.accumulated_number ? data?.accumulated_number : 2781} {intl.formatMessage({id: 'refer.hours'})}</div>
                </Card>
            </div>
            <Modal
                title={intl.formatMessage({id: 'member.modal.header'})}
                centered
                open={open}
                onOk={() => setOpen(false)}
                width={500}
                footer={null}
                onCancel={() => setOpen(false)}
            >
                <div>
                    {intl.formatMessage({id: 'member.modal.description'})}
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Button
                            type='primary'
                            style={{width: '270px'}}
                            onClick={() => {
                                history.push('/refer')
                            }}>
                            {intl.formatMessage({id: 'refer'})}
                        </Button>
                        <Button
                            type='primary'
                            style={{width: '270px', marginTop: '10px'}}
                            onClick={() => history.push('/renew')}>
                            {intl.formatMessage({id: 'member.buy_now'})}
                        </Button>
                        <Button
                            style={{width: '270px', marginTop: '10px'}}
                            onClick={() => {
                                setOpen(false)
                            }}>
                            {intl.formatMessage({id: 'member.try_it'})}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}