import React from "react";
import {onMarkActivityAsDone} from "../eventhandlers/ActivityEventHandler";

export const mapFromModelAsColumnList = activities => {
    return activities && activities.length
        ? (
            <div className='row'>
                <div className='col-6 offset-3'>
                    {activities.map(activity => mapSingleAsListItem(activity))}
                </div>
            </div>
        )
        : (
            <div className='row'>
                <div className='col-6 offset-3'>
                    <h2>Brak</h2>
                </div>
            </div>
        );
}
export const mapFromModelAsTextList = activities =>
    activities && activities.length
        ? (
            <ol className='activity-text-list'>
                {activities.map(activity => (<li key={activity.id}>{activity.name}</li>))}
            </ol>
        )
        : (<p>Brak</p>)
;

const mapSingleAsListItem = activity => (
    <div className='row interval-status' key={activity.id}>
        <div className='col interval-status-prop'>
            <p>Nazwa: <b>{activity.name}</b></p>
        </div>
        <div
            data-id={activity.id}
            onClick={onMarkActivityAsDone}
            className='col interval-status-prop hover-background-color-green hover-color-white hover-pointer-click'>
            <p><b>Zrobione!</b></p>
        </div>
    </div>
);
