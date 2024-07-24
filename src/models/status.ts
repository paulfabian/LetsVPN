// src/models/status.js
import {useEffect, useState} from 'react';
import request from 'umi-request';

export default () => {
    const [data, setData] = useState('');

    const fetchData = () => {
        request('/api/v1/status', {method: 'POST'}).then((res) => {
            if (res.status === 'success') {
                setData(res.data);
                localStorage.setItem('connected', JSON.stringify(res.data.connected));
            }
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        fetchData();

        return () => clearInterval(intervalId);
    }, []);

    const refreshData = () => {
        fetchData();
    };

    return {
        data: data,
        refreshData: refreshData
    };
};
