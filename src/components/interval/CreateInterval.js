import React, {useState} from 'react';
import {AddActivity} from "./activities/AddActivity";
import {getActivityTypes} from "../../service/ActivityTypeService";
import {Activity, Interval} from "../../models/models";
import {saveInterval} from "../../service/IntervalService";
import {mapListFromModel} from "../../ui/Interval";
import {addActivity, saveActivity} from "../../service/ActivityService";

const saveNewInterval = async refs => { //@todo: stop using refs, instead search via DOM; move to event handler
    const {nameInput, dateStartInput, dateEndInput, activities} = refs;
    const intervalToSave = new Interval(
        null,
        nameInput.current.value,
        'new',
        dateStartInput.current.value,
        dateEndInput.current.value,
        []
    );

    const activitiesToSave = activities.map(activity => {
        return new Activity(
            null,
            activity.refs.name.current.value,
            activity.refs.type.current.value,
            activity.refs.dateStart.current.value
        );
    });

    const interval = await saveInterval(intervalToSave);
    await activitiesToSave.forEach(async activity => {
        const activityId = await saveActivity(activity);
        addActivity(interval.id, activityId);
    });

    return new Interval(
        interval.id,
        interval.name,
        interval.status,
        interval.dateStart,
        interval.dateEnd,
    );
};

export const CreateInterval = props => {
    const nameInput = React.createRef();
    const dateStartInput = React.createRef();
    const dateEndInput = React.createRef();
    const [activities, setActivities] = useState([]);
    const onIntervalAdd = e => {    //todo move to IntervalEventHandler
        e.preventDefault();
        saveNewInterval({nameInput, dateStartInput, dateEndInput, activities}).then(interval => {
            props.setIntervals([...props.intervals, mapListFromModel(interval, props.intervals.length)]);
        });
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10 offset-1'>
                    <p className='fontsize-48'>Nowy interwał</p>
                    <form onSubmit={onIntervalAdd}>
                        <div className='form-group'>
                            <label>Nazwa interwału</label>
                            <input type='text' className='form-control' ref={nameInput}/>
                        </div>
                        <div className='form-group'>
                            <label>Data rozpoczęcia</label>
                            <input required type='date' placeholder='yyyy-mm-dd' className='form-control' ref={dateStartInput}/>
                        </div>
                        <div className='form-group'>
                            <label>Data zakończenia</label>
                            <input required type='date' placeholder='yyyy-mm-dd' className='form-control' ref={dateEndInput}/>
                        </div>
                        <p>Aktywności</p>
                        <AddActivity activities={activities} setActivities={setActivities} getTypes={getActivityTypes}/>
                        <br/><button type='submit' className="btn btn-success float-right">Stwórz interwał</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
