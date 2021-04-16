import React, {useState} from 'react';
import {IntervalList} from "./IntervalList";
import {CreateInterval} from "./CreateInterval";
import {getIntervals} from "../../service/IntervalService";
import {addMessage} from "../../service/MessageService";
import {Message} from "../../models/models";
import {getTokenProvider} from "../../auth/TokenProvider";
import {mapEndedFromModel, mapListFromModel} from "../../ui/Interval";
import {Messages} from "../common/Messages";

const mapIntervals = async setIntervals => {
    try {
        const intervals = await getIntervals(['status[]=started', 'status[]=new', 'status[]=pending', 'status[]=draft', 'status[]=saved']);
        setIntervals(intervals.map((interval, index) => mapListFromModel(interval, index)))
    } catch (e) {
        addMessage('login', new Message('danger', 'Zostałeś wylogowany'));
        getTokenProvider().clearToken();
        window.location.href = '/login';
    }
};

const mapEndedIntervals = async setIntervals => {
    try {
        const intervals = await getIntervals(['status=ended']);
        setIntervals(intervals.map((interval, index) => mapEndedFromModel(interval, index)))
    } catch (e) {
        addMessage('login', new Message('danger', 'Zostałeś wylogowany'));
        getTokenProvider().clearToken();
        window.location.href = '/login';
    }
};

const Interval = () => {
    const [intervals, setIntervals] = useState([]);
    const [endedIntervals, setEndedIntervals] = useState([]);

    return (
        <div className="container">
            <Messages sessionKey='interval'/>
            <div className='row'>
                <div className='col'>
                    <IntervalList intervals={intervals} mapIntervals={mapIntervals} setIntervals={setIntervals}
                                  title='Lista trwających interwałów'/>
                    <hr/>
                    <CreateInterval intervals={intervals} setIntervals={setIntervals}/>
                    <hr/>
                    <IntervalList intervals={endedIntervals} mapIntervals={mapEndedIntervals}
                                  setIntervals={setEndedIntervals} title='Lista zakończonych interwałów'/>
                </div>
            </div>
        </div>
    )
};

export default Interval;
