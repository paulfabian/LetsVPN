import {useState, useEffect} from 'react';
import request from 'umi-request';

export default () => {
    const [connected, setConnected] = useState(false);
    const [region, setRegion] = useState(0);
    const [renew, setRenew] = useState('');
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        const savedConnected = localStorage.getItem('connected');
        const region = localStorage.getItem('region');
        if (savedConnected) {
            setConnected(JSON.parse(savedConnected));
        }
        setRegion(parseInt(region));

    }, []);

    useEffect(() => {
        localStorage.setItem('connected', JSON.stringify(connected));
    }, [connected]);

    useEffect(() => {
        const checkConnectionStatus = async () => {
            try {
                request('/api/v1/status', {method: 'POST'}).then((res) => {
                    if (res.status === 'success') {
                        setConnected(res.data.connected);
                        setRegion(res.data.node_id);
                        localStorage.setItem('connected', JSON.stringify(res.data.connected));
                        localStorage.setItem('region', JSON.stringify(res.data.node_id));
                    }
                });

            } catch (error) {
                console.error('Error fetching connection status:', error);
            }
        };

        const intervalId = setInterval(checkConnectionStatus, 5000); // Call the API every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return {
        connected,
        setConnected,
        region,
        setRegion,
        renew,
        setRenew,
        daysRemaining,
        setDaysRemaining
    };
};
