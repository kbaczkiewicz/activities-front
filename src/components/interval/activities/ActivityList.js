import React, {useEffect, useState} from "react";
import {getUniqueActivities} from "../../../service/ActivityService";

const mapUniqueActivities = async intervalId => {
    const activities = await getUniqueActivities(intervalId);

    return activities.map(activity => {
        return <tr>
            <td>{activity.name}</td>
            <td>{activity.occurrences.map(occurence => <p>{occurence}</p>)}</td>
        </tr>
    });
};

export const ActivityList = props => {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        mapUniqueActivities(props.match.params.intervalId).then(activities => {
            setActivities(activities)
        });
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10 offset-1'>
                    <p className='fontsize-48'>{props.title}</p>
                    <table className="table table-condensed">
                        <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Wystąpienia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {activities}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
