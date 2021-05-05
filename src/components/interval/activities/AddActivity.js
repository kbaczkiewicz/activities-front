import React from "react";

const addActivityForm = async (key, getTypes) => {
    const nameInput = React.createRef();
    const typeInput = React.createRef();
    const dateStartInput = React.createRef();
    const types = await getTypes();
    const activityForm = (
        <tr key={key}>
            <td>
                <input type='text' className='form-control' ref={nameInput} placeholder='Nazwa'/>
            </td>
            <td>
                <select className='form-control' ref={typeInput}>
                    {types.map((type, index) => <option key={index} value={type.id}>{type.name}</option>)}
                </select>
            </td>
        </tr>
    );

    return [{form: activityForm, refs: {name: nameInput, type: typeInput, dateStart: dateStartInput}}];
};

export const AddActivity = props => {
    const onActivityAdd = () => {
        addActivityForm(props.activities.length, props.getTypes)
            .then(activityForm => props.setActivities([...props.activities, ...activityForm]))
    };

    return (
        <div className="row" id="activities-table-container">
            <div className="col">
                <table className='table table-condensed'>
                    <thead>
                    <tr>
                        <th>
                            Nazwa
                        </th>
                        <th>
                            Typ
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.activities.map(activity => {
                        return activity.form
                    })}
                    </tbody>
                </table>
                <button type='button' className='btn btn-success float-right' onClick={onActivityAdd}>
                    Dodaj aktywność
                </button>
            </div>
        </div>
    );
};

