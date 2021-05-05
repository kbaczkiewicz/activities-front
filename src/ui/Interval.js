import React from "react";
import {onIntervalClick, onIntervalDelete, onIntervalStatsShow} from "../eventhandlers/IntervalEventHandler";
import {mapFromModelAsColumnList, mapFromModelAsTextList} from "./Activity";
import {translateIntervalStatus} from "../util/StatusTranslator";

export const mapListFromModel = (interval, key) => (
    <tr key={key} id={`interval-${interval.id}`}>
        <td>{interval.name}</td>
        <td>{translateIntervalStatus(interval.status)}</td>
        <td>{interval.dateStart}</td>
        <td>{interval.dateEnd}</td>
        <td>
            <button className='btn btn-info btn-sm' data-id={interval.id} onClick={onIntervalClick}>O</button>
            {'started' !== interval.status ? (<button className='btn btn-danger btn-sm' data-id={interval.id} onClick={onIntervalDelete}>X</button>) : ''}
        </td>
    </tr>
);

export const mapEndedFromModel = (interval, key) => (
    <tr key={key} id={`interval-${interval.id}`}>
        <td>{interval.name}</td>
        <td>{translateIntervalStatus(interval.status)}</td>
        <td>{interval.dateStart}</td>
        <td>{interval.dateEnd}</td>
        <td>
            <button className='btn btn-info btn-sm' data-id={interval.id} onClick={onIntervalStatsShow}>O</button>
        </td>
    </tr>
);

export const mapSingleFromModel = (interval, activities) => {
    const {pending, completed, failed} = activities;

    return (
        <div className='row'>
            <div className='col'>
                <div className='row interval-status'>
                    <div className='col interval-status-prop'>
                        <p>Nazwa: <b>{interval.name}</b></p>
                    </div>
                    <div className='col interval-status-prop'>
                        <p>Status: <b>{translateIntervalStatus(interval.status)}</b></p>
                    </div>
                    <div className='col interval-status-prop'>
                        <p>Data rozpoczęcia: <b>{interval.dateStart}</b></p>
                    </div>
                    <div className='col interval-status-prop'>
                        <p>Data zakończenia: <b>{interval.dateEnd}</b></p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h2>Trwające aktywności</h2>
                        {mapFromModelAsColumnList(pending)}
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <h2>Ukończone aktywności</h2>
                        {mapFromModelAsTextList(completed)}
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <h2>Pominięte aktywności</h2>
                        {mapFromModelAsTextList(failed)}
                    </div>
                </div>
            </div>
        </div>
    );
};

