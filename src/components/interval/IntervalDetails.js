import React, {useEffect, useState} from "react";
import {getInterval} from "../../service/IntervalService";
import {getActivities} from "../../service/ActivityService";
import {mapSingleFromModel} from "../../ui/Interval";
import {addMessage} from "../../service/MessageService";
import {Message} from "../../models/models";
import {parseDate} from "../../util/dateparser";

const mapInterval = async (setInterval, intervalId) => {
    try {
        const interval = await getInterval(intervalId);
        const activities = {
            pending: await getActivities(intervalId,  [`dateStart=${parseDate(Date.now())}`, 'status=pending']),
            completed: await getActivities(intervalId, ['status=completed']),
            failed: await getActivities(intervalId, ['status=failed'])
        };

        setInterval(mapSingleFromModel(interval, activities));
    } catch (e) {
        window.location.href = '/intervals';
        addMessage('interval', new Message('danger', 'Nie ma takiego interwału'));
    }
};

export const IntervalDetails = props => {
    const [interval, setInterval] = useState(null);
    const intervalId = props.match.params.intervalId;

    useEffect(() => {
        mapInterval(setInterval, intervalId);
    }, []);

    return (
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <h1>Szczegóły interwału</h1>
                    <hr />
                    {interval}
                </div>
                <div className='col-2 offset-10'>
                    <a href={`/interval/${intervalId}/activities`} className='btn btn-info'>Wystąpienia aktywności</a>
                </div>
            </div>
        </div>
    )
};
