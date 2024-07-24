import {Button, Divider, Table, Card, Modal} from 'antd'
import {usePagination} from 'ahooks';
import getTableData from '@/utils/getTableData'
import {endpoints} from '@/api'
import {useEffect, useState} from 'react'
import {useIntl, setLocale, useModel} from 'umi'
import copy from 'copy-to-clipboard';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Uuid',
        dataIndex: 'uuid'
    }
];

export default () => {
    const intl = useIntl();
    const {dataStatus} = useModel('status');
    const [openRule, setOpenRule] = useState(false);
    const [openInvite, setOpenInvite] = useState(false);


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

    const handleCopy = () => {
        const textToCopy = intl.formatMessage({id: 'refer.invite_description'}); // Get the text to copy from intl
        copy(textToCopy);

    };

    const {data, loading} =
        usePagination(({current, pageSize, query}) =>
            getTableData(endpoints.users, {
                current, pageSize, query
            }), {
            defaultPageSize: 10
        });

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'refer'})}</div>
            <Divider/>
            <div>
                <div
                    style={{fontSize: '20px'}}>{intl.formatMessage({id: 'refer.description1'})}</div>
                <div
                    style={{fontSize: '20px'}}>{intl.formatMessage({id: 'refer.description2'})}
                    <span style={{
                        fontSize: '30px',
                        fontWeight: '500',
                        color: '#1677ff'
                    }}>
                        20%
                    </span>{intl.formatMessage({id: 'refer.bonus'})}</div>
                <div style={{
                    fontSize: '20px',
                    marginTop: '8px'
                }}>{intl.formatMessage({id: 'refer.description3'})}
                    <a onClick={() => setOpenRule(true)}>
                        {intl.formatMessage({id: 'refer.detail_rules'})}
                    </a>
                </div>
                <Button
                    type="primary"
                    style={{
                        marginTop: '10px',
                        width: '270px',
                        height: '40px',
                        fontSize: '15px'
                    }}
                    onClick={() => setOpenInvite(true)}>
                    {intl.formatMessage({id: 'refer.invite_friends'})}
                </Button>
            </div>
            <div style={{display: 'flex', marginTop: '40px'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Card style={{paddingBottom: '80px', paddingRight: '80px'}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'refer.successfully_referred'})}</div>
                        <div style={{
                            color: '#1677ff',
                            fontSize: '25px',
                            fontWeight: '500'
                        }}>{dataStatus?.successfully_referred ? dataStatus?.successfully_referred : 0} {intl.formatMessage({id: 'refer.ppl'})}
                        </div>
                    </Card>
                    <Card style={{paddingBottom: '80px', paddingRight: '80px'}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'refer.bonus_obtained'})}</div>
                        <div style={{
                            color: '#1677ff',
                            fontSize: '25px',
                            fontWeight: '500'
                        }}>{dataStatus?.bonus ? dataStatus?.bonus : 0} {intl.formatMessage({id: 'refer.hours'})}</div>
                    </Card>
                    <Card style={{paddingBottom: '80px', paddingRight: '80px'}}>
                        <div
                            style={{fontSize: '20px'}}>{intl.formatMessage({id: 'refer.accumulated_earned'})}</div>
                        <div style={{
                            color: '#1677ff',
                            fontSize: '25px',
                            fontWeight: '500'
                        }}>{dataStatus?.accumulated_earned ? dataStatus?.accumulated_earned : 0} $
                        </div>
                    </Card>
                </div>
                <div style={{marginLeft: '40px'}}>
                    <Card>
                        <div>{intl.formatMessage({id: 'refer.my_reward'})}</div>
                        <Table loading={loading}
                               dataSource={data?.list}
                               pagination={false}
                               columns={columns}
                               rowKey={'key'}/>
                    </Card>
                </div>
            </div>
            <Modal
                title={intl.formatMessage({id: 'refer.detail_rules'})}
                centered
                open={openRule}
                onOk={() => setOpenRule(false)}
                width={600}
                footer={null}
                onCancel={() => setOpenRule(false)}
            >
                <div>
                    <p>{intl.formatMessage({id: 'refer.detail_rules_main'})}</p>
                    {intl.formatMessage({id: 'refer.detail_rules_description'})}
                </div>
                <div style={{textAlign: 'right'}}>
                    <Button
                        type='primary'
                        style={{width: '100px'}}
                        onClick={() => {
                            setOpenRule(false)
                        }}>{intl.formatMessage({id: 'refer.ok'})}
                    </Button>
                </div>
            </Modal>
            <Modal
                title={intl.formatMessage({id: 'refer.invitation_text'})}
                centered
                open={openInvite}
                onOk={() => setOpenInvite(false)}
                width={600}
                footer={null}
                onCancel={() => setOpenInvite(false)}
            >
                <div style={{
                    border: '1px solid',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    {intl.formatMessage({id: 'refer.invite_description'})}</div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px'
                }}>
                    <Button
                        type='primary'
                        style={{width: '250px'}}
                        onClick={handleCopy}>
                        {intl.formatMessage({id: 'refer.copy_text'})}
                    </Button>
                    <Button
                        style={{width: '250px'}}
                        onClick={() => {
                            setOpenInvite(false)
                        }}>{intl.formatMessage({id: 'refer.cancel'})}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}