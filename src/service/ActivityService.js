import {getClient} from "../client/Client";
import {Activity} from "../models/models";

export const saveActivity = async activity => {
    const response = await getClient().saveActivity(activity.serialize());
    return response.data.data.id;
};

export const addActivity = async (intervalId, activityId) => {
    return getClient().addActivities(await [activityId], intervalId);
};

export const getActivities = async (intervalId, filters = []) => {
    const activitiesData = await getClient().getActivities(intervalId, filters.join('&'));
    try {
        return activitiesData.data.map(activityData => new Activity(
            activityData.id,
            activityData.name,
            activityData.type,
            activityData.dateStart
            ));
    } catch (e) {
        return [];
    }
};

export const markActivityAsDone = activityId => {
    return getClient().markActivityAsDone(activityId);
};
