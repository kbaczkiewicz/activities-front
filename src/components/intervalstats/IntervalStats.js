import React, {useEffect, useState} from 'react';
import {getInterval} from "../../service/IntervalService";
import {getIntervalStats} from "../../service/IntervalStatsService";



export const IntervalStats = props => {
    const [interval, setInterval] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        getInterval(props.match.params.intervalId).then((data) => setInterval(data));
        getIntervalStats(props.match.params.intervalId).then((data) => setStats(data));
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Statystyki dla {interval.name}</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <p>Ukończone aktywności: <b>{stats.completedAmount}</b></p>
                    <p>Nieukończone aktywności: <b>{stats.failedAmount}</b></p>
                    <p>% ukończonych aktywności: <b>{(stats.completedPercent ?? 0) * 100}%</b></p>
                </div>
            </div>
        </div>
    );
};
