import React, {useState} from 'react';
import {getInterval} from "../../service/IntervalService";
import {getIntervalStats} from "../../service/IntervalStatsService";

export const IntervalStats = props => {
    const [interval, setInterval] = useState(getInterval(props.match.params.intervalId));
    const [stats, setStats] = useState(getIntervalStats(props.match.params.intervalId));

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
                    <p>% ukończonych aktywności: <b>{stats.completedPercent}</b></p>
                </div>
            </div>
        </div>
    );
};
