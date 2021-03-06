import React from "react";
import {onIntervalClick, onIntervalStatsShow} from "../eventhandlers/IntervalEventHandler";
import {mapFromModelAsColumnList, mapFromModelAsTextList} from "./Activity";
import {translateIntervalStatus} from "../util/StatusTranslator";

const onDeleteButtonClick = e => {
    document.querySelector('#confirmDeleteInterval').dataset.intervalId = e.target.dataset.intervalId
};

export const mapListFromModel = (interval, key) => (
    <tr key={key} id={`interval-${interval.id}`}>
        <td>{interval.name}</td>
        <td>{translateIntervalStatus(interval.status)}</td>
        <td>{interval.dateStart}</td>
        <td>{interval.dateEnd}</td>
        <td>
            <button className='btn btn-info btn-sm' data-id={interval.id} onClick={onIntervalClick}>O</button>
            {'started' !== interval.status ? (
                <button
                    type='button'
                    className='btn btn-danger btn-sm'
                    data-interval-id={interval.id}
                    data-toggle='modal'
                    data-target='#deleteIntervalModal'
                    onClick={onDeleteButtonClick}
                >
                    X
                </button>) :
                ''}
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
                        <p>Data rozpocz??cia: <b>{interval.dateStart}</b></p>
                    </div>
                    <div className='col interval-status-prop'>
                        <p>Data zako??czenia: <b>{interval.dateEnd}</b></p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h2>Trwaj??ce aktywno??ci</h2>
                        {mapFromModelAsColumnList(pending)}
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <h2>Uko??czone aktywno??ci</h2>
                        {mapFromModelAsTextList(completed)}
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <h2>Pomini??te aktywno??ci</h2>
                        {mapFromModelAsTextList(failed)}
                    </div>
                </div>
            </div>
        </div>
    );
};

