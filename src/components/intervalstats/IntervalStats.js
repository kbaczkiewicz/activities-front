import React, {useEffect, useState} from 'react';
import {getInterval} from "../../service/IntervalService";
import {getIntervalStats, groupStats} from "../../service/IntervalStatsService";
import {asCompletedToFailedBar, asCompletedToFailedRatioOverTime} from "../../service/ChartService";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


const createRatioChart = data => {
    const retData = [];
    Object.entries(asCompletedToFailedRatioOverTime(groupStats(data))).forEach(([name, chartData]) => {
        retData.push((<p key={Math.random()}>{name} - ukończone do nieukończonych w czasie</p>));
        retData.push(
            (<LineChart key={Math.random()} width={730} height={250} data={chartData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="fp" name="% ukończonych aktywności" stroke="#cc0000"/>
                <Line type="monotone" dataKey="cp" name="% nieukończonych aktywności" stroke="#00cc00"/>
            </LineChart>)
        )
    });

    return retData;
};

const createBarChart = data => {
    const retData = [];
    Object.entries(asCompletedToFailedBar(groupStats(data))).forEach(([name, chartData]) => {
        retData.push((<p key={Math.random()}>{name} - ilość ukończonych i nieukończonych</p>));
        retData.push(<BarChart key={Math.random()} width={730} height={250} data={[chartData]}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="failed" name="Nieukończone aktywności" fill="#00cc00"/>
                <Bar dataKey="completed" name="Ukończone aktywności" fill="#cc0000"/>
            </BarChart>
        );
    });
    return retData;
}

export const IntervalStats = props => {
    const [interval, setInterval] = useState([]);
    const [stats, setStats] = useState([]);
    const [ratioData, setRatioData] = useState([]);
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        getInterval(props.match.params.intervalId).then((data) => setInterval(data));
        getIntervalStats(props.match.params.intervalId).then((data) => {
            setStats(data);
            setRatioData(createRatioChart(data.activities));
            setBarData(createBarChart(data.activities));
        });
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
            <div className='row'>
                <div className='col'>
                    <h2>Wykresy</h2>
                    {ratioData}
                    {barData}
                </div>
            </div>
        </div>
    );
};
