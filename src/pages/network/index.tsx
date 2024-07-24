import {Divider, Radio, message} from 'antd'
import request from 'umi-request'
import {useEffect, useState} from 'react'
import {useModel, useIntl, setLocale} from 'umi'
import EU from '../../assets/flags/EU.svg'
import IL from '../../assets/flags/IL.svg'
import JP from '../../assets/flags/JP.svg'
import SG from '../../assets/flags/SG.svg'
import MY from '../../assets/flags/MY.svg'
import HK from '../../assets/flags/HK.svg'
import KR from '../../assets/flags/KR.svg'
import TH from '../../assets/flags/TH.svg'
import IN from '../../assets/flags/IN.svg'
import PH from '../../assets/flags/PH.svg'
import VN from '../../assets/flags/VN.svg'
import CH from '../../assets/flags/CH.svg'
import IE from '../../assets/flags/IE.svg'
import PL from '../../assets/flags/PL.svg'
import GB from '../../assets/flags/GB.svg'
import DE from '../../assets/flags/DE.svg'
import IT from '../../assets/flags/IT.svg'
import RU from '../../assets/flags/RU.svg'
import ES from '../../assets/flags/ES.svg'
import NL from '../../assets/flags/NL.svg'
import SE from '../../assets/flags/SE.svg'
import FR from '../../assets/flags/FR.svg'
import NO from '../../assets/flags/NO.svg'
import TR from '../../assets/flags/TR.svg'
import ZA from '../../assets/flags/ZA.svg'
import EG from '../../assets/flags/EG.svg'
import CA from '../../assets/flags/CA.svg'
import MX from '../../assets/flags/MX.svg'
import US from '../../assets/flags/US.svg'
import AR from '../../assets/flags/AR.svg'
import BR from '../../assets/flags/BR.svg'
import CO from '../../assets/flags/CO.svg'
import './Network.css'


export default () => {
    const {data, refreshData} = useModel('status');
    const [networkMode, setNetworkMode] = useState('');
    const [selectedNode, setSelectedNode] = useState(0);
    const intl = useIntl();

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

    useEffect(() => {
        setNetworkMode(data?.mode);
        setSelectedNode(data?.node_id?.toString());
    }, [refreshData]);


    const handleNodeChange = (e) => {
        const nodeId = e.target.value;
        setSelectedNode(nodeId.toString());
        request('/api/v1/node', {
            method: 'POST',
            data: {
                "id": parseInt(nodeId),
                locale: localStorage.getItem('locale')
            }
        }).then(response => {
            if (response && response.status === 'success') {
                message.success(response.message);
                refreshData()
            } else {
                message.error(response.message);
            }
        });
    };

    const handleNetworkModeChange = (e) => {
        const mode = e.target.value;
        setNetworkMode(mode);
        request('/api/v1/mode', {
            method: 'POST',
            data: {
                mode: mode,
                locale: localStorage.getItem('locale')
            }
        }).then(response => {
            if (response && response.status === 'success') {
                message.success(response.message);
                refreshData()
            } else {
                message.error(response.message);
            }
        });
    };

    return (
        <div>
            <div style={{
                fontSize: '30px',
                fontWeight: '500'
            }}>{intl.formatMessage({id: 'network'})}</div>
            <Divider/>
            <div>
                <p style={{fontSize: '20px'}}>{intl.formatMessage({id: 'network.select_network_mode'})}</p>
                <Radio.Group onChange={handleNetworkModeChange}
                             value={networkMode}>
                    <Radio
                        value="global">{intl.formatMessage({id: 'network.full_speed'})}</Radio>
                    <div className="radio-description">
                        {intl.formatMessage({id: 'network.full_speed.description'})}
                    </div>
                    <Radio
                        value="rule">{intl.formatMessage({id: 'network.full_mask'})}</Radio>
                    <div
                        className="radio-description">{intl.formatMessage({id: 'network.full_mask_description'})}</div>
                </Radio.Group>
            </div>
            <Divider/>
            <p style={{fontSize: '20px'}}>{intl.formatMessage({id: 'network.switch_region'})}</p>
            <Radio.Group onChange={handleNodeChange} value={selectedNode}>
                <Radio value="100">
                    <div style={{display: 'flex'}}>
                        <img style={{width: '20px', marginRight: '5px'}}
                             alt="auto"
                             src={EU}/>
                        {intl.formatMessage({id: 'network.auto'})}
                    </div>
                </Radio>
                <Divider/>
                <div>
                    <p style={{fontSize: '15px'}}>{intl.formatMessage({id: 'network.asia'})}</p>
                    <div style={{display: 'flex'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="37">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Israel"
                                         src={IL}/>
                                    {intl.formatMessage({id: 'network.israel'})}
                                </div>
                            </Radio>
                            <Radio value="2">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Japan"
                                         src={JP}/>
                                    {intl.formatMessage({id: 'network.japan'})}
                                </div>
                            </Radio>
                            <Radio value="18">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Singapore"
                                         src={SG}/>
                                    {intl.formatMessage({id: 'network.singapore'})}
                                </div>
                            </Radio>
                            <Radio value="23">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Malaysia"
                                         src={MY}/>
                                    {intl.formatMessage({id: 'network.malaysia'})}
                                </div>
                            </Radio>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="1">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Hong Kong"
                                         src={HK}/>
                                    {intl.formatMessage({id: 'network.hong_kong'})}
                                </div>
                            </Radio>
                            <Radio value="13">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Korea"
                                         src={KR}/>
                                    {intl.formatMessage({id: 'network.korea'})}
                                </div>
                            </Radio>
                            <Radio value="24">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Thailand"
                                         src={TH}/>
                                    {intl.formatMessage({id: 'network.thailand'})}
                                </div>
                            </Radio>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="12">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="India"
                                         src={IN}/>
                                    {intl.formatMessage({id: 'network.india'})}
                                </div>
                            </Radio>
                            <Radio value="40">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Philippiness"
                                         src={PH}/>
                                    {intl.formatMessage({id: 'network.philippiness'})}
                                </div>
                            </Radio>
                            <Radio value="39">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Vietnam"
                                         src={VN}/>
                                    {intl.formatMessage({id: 'network.vietnam'})}
                                </div>
                            </Radio>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div>
                    <p style={{fontSize: '15px'}}> {intl.formatMessage({id: 'network.europe'})}</p>
                    <div style={{display: 'flex'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="25">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Switzerland"
                                         src={CH}/>
                                    {intl.formatMessage({id: 'network.switzerland'})}
                                </div>
                            </Radio>
                            <Radio value="30">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Ireland"
                                         src={IE}/>
                                    {intl.formatMessage({id: 'network.ireland'})}
                                </div>
                            </Radio>
                            <Radio value="22">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Poland"
                                         src={PL}/>
                                    {intl.formatMessage({id: 'network.poland'})}
                                </div>
                            </Radio>
                            <Radio value="4">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="United Kingdom"
                                         src={GB}/>
                                    {intl.formatMessage({id: 'network.united_kingdom'})}
                                </div>
                            </Radio>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="5">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Germany"
                                         src={DE}/>
                                    {intl.formatMessage({id: 'network.germany'})}
                                </div>
                            </Radio>
                            <Radio value="9">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Italy"
                                         src={IT}/>
                                    {intl.formatMessage({id: 'network.italy'})}
                                </div>
                            </Radio>
                            <Radio value="14">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Russian"
                                         src={RU}/>
                                    {intl.formatMessage({id: 'network.russian'})}
                                </div>
                            </Radio>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="10">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Spain"
                                         src={ES}/>
                                    {intl.formatMessage({id: 'network.spain'})}
                                </div>
                            </Radio>
                            <Radio value="19">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Netherlands"
                                         src={NL}/>
                                    {intl.formatMessage({id: 'network.netherlands'})}
                                </div>
                            </Radio>
                            <Radio value="26">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Sweden"
                                         src={SE}/>
                                    {intl.formatMessage({id: 'network.sweden'})}
                                </div>
                            </Radio>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value="6">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="France"
                                         src={FR}/>
                                    {intl.formatMessage({id: 'network.france'})}
                                </div>
                            </Radio>
                            <Radio value="27">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Norway"
                                         src={NO}/>
                                    {intl.formatMessage({id: 'network.norway'})}
                                </div>
                            </Radio>
                            <Radio value="17">
                                <div style={{display: 'flex'}}>
                                    <img style={{
                                        width: '20px',
                                        marginRight: '5px'
                                    }} alt="Turkey"
                                         src={TR}/>
                                    {intl.formatMessage({id: 'network.turkey'})}
                                </div>
                            </Radio>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div>
                    <p style={{fontSize: '15px'}}>{intl.formatMessage({id: 'network.africa'})}</p>
                    <Radio value="16">
                        <div style={{display: 'flex'}}>
                            <img alt="South Africa"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={ZA}/>
                            {intl.formatMessage({id: 'network.south_africa'})}
                        </div>
                    </Radio>
                    <Radio value="20">
                        <div style={{display: 'flex'}}>
                            <img alt="Egypts"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={EG}/>
                            {intl.formatMessage({id: 'network.egypt'})}
                        </div>
                    </Radio>
                </div>
                <Divider/>
                <div>
                    <p style={{fontSize: '15px'}}>{intl.formatMessage({id: 'network.north_america'})}</p>
                    <Radio value="7">
                        <div style={{display: 'flex'}}>
                            <img alt="United States"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={CA}/>
                            {intl.formatMessage({id: 'network.canada'})}
                        </div>
                    </Radio>
                    <Radio value="15">
                        <div style={{display: 'flex'}}>
                            <img alt="United States"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={MX}/>
                            {intl.formatMessage({id: 'network.mexico'})}
                        </div>
                    </Radio>
                    <Radio value="3">
                        <div style={{display: 'flex'}}>
                            <img alt="United States"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={US}/>
                            {intl.formatMessage({id: 'network.united_state'})}
                        </div>
                    </Radio>
                </div>
                <Divider/>
                <div>
                    <p style={{fontSize: '15px'}}>{intl.formatMessage({id: 'network.south_america'})}</p>
                    <Radio value="21">
                        <div style={{display: 'flex'}}>
                            <img alt="United States"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={AR}/>
                            {intl.formatMessage({id: 'network.argentina'})}
                        </div>
                    </Radio>
                    <Radio value="11">
                        <div style={{display: 'flex'}}>
                            <img alt="United States"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={BR}/>
                            {intl.formatMessage({id: 'network.brazil'})}
                        </div>
                    </Radio>
                    <Radio value="42">
                        <div style={{display: 'flex'}}>
                            <img alt="Colombia"
                                 style={{width: '20px', marginRight: '5px'}}
                                 src={CO}/>
                            {intl.formatMessage({id: 'network.colombia'})}
                        </div>
                    </Radio>
                </div>
            </Radio.Group>
        </div>
    );
}