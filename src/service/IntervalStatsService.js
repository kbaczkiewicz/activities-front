import {IntervalStats, RatioChartData} from "../models/models";
import {getClient} from "../client/Client";

export const getIntervalStats = async intervalId => {
    const response = await getClient().getIntervalStats(intervalId);
    return new IntervalStats(
        response.data.data.activities,
        response.data.data.completed,
        response.data.data.failed,
        response.data.data.completedPercent
    )
};

export const groupStats = activities => {
    return activities.reduce((groupedActivities, activity) => {
        groupedActivities[activity.name] = activities
            .filter(activityToGroup => activity.name === activityToGroup.name)
            .sort((a, b) => {
                return new Date(a.dateStart) - new Date(b.dateStart)
            });

        return groupedActivities;
    }, {});
};
