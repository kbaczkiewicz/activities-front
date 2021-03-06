import React, {useState} from 'react';
import {AddActivity} from "./activities/AddActivity";
import {getActivityTypes} from "../../service/ActivityTypeService";
import {Activity, Interval, Message} from "../../models/models";
import {saveInterval} from "../../service/IntervalService";
import {mapListFromModel} from "../../ui/Interval";
import {addActivity, saveActivity} from "../../service/ActivityService";
import {addMessage} from "../../service/MessageService";

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
            dateStartInput.current.value
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
    const onIntervalAdd = e => {
        if (/\S/.test(nameInput.current.value) && dateStartInput.current.value && dateEndInput.current.value) {
            e.preventDefault();
            saveNewInterval({nameInput, dateStartInput, dateEndInput, activities}).then(interval => {
                props.setIntervals([...props.intervals, mapListFromModel(interval, props.intervals.length)]);
            });
        } else {
            addMessage('interval', new Message('danger', 'Nieprawid??owe dane w interwale'));
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10 offset-1'>
                    <p className='fontsize-48'>Nowy interwa??</p>
                    <form onSubmit={onIntervalAdd}>
                        <div className='form-group'>
                            <label>Nazwa interwa??u</label>
                            <input required type='text' className='form-control' ref={nameInput}/>
                        </div>
                        <div className='form-group'>
                            <label>Data rozpocz??cia</label>
                            <input required type='date' placeholder='yyyy-mm-dd' className='form-control'
                                   ref={dateStartInput}/>
                        </div>
                        <div className='form-group'>
                            <label>Data zako??czenia</label>
                            <input required type='date' placeholder='yyyy-mm-dd' className='form-control'
                                   ref={dateEndInput}/>
                        </div>
                        <p>Aktywno??ci</p>
                        <AddActivity activities={activities} setActivities={setActivities} getTypes={getActivityTypes}/>
                        <br/>
                        <button type='submit' className="btn btn-success float-right">Stw??rz interwa??</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
