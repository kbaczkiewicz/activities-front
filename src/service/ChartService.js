export const asCompletedToFailedRatioOverTime = data => {
    let [failed, completed] = [0, 0];
    const parsedActivities = {};

    for (const [name, activities] of Object.entries(data)) {
        parsedActivities[name] = activities.reduce((ratioChartData, activity) => {
            switch (activity.status) {
                case 'failed':
                    failed++;
                    break;
                case 'completed':
                    completed++;
                    break;
                default:
                    break;
            }

            ratioChartData.push({
                name: activity.dateStart,
                fp: calculatePercentValue(failed, (failed + completed)).toFixed(2),
                cp: calculatePercentValue(completed, (failed + completed)).toFixed(2),
                amt: 1000
            });

            return ratioChartData;
        }, [])
    }
    return parsedActivities;
};

export const asCompletedToFailedBar = data => {
    const parsedActivities = {};

    for (const [name, activities] of Object.entries(data)) {
        parsedActivities[name] = activities.reduce((barChartData, activity) => {
            switch (activity.status) {
                case 'failed':
                    barChartData.failed++;
                    break;
                case 'completed':
                    barChartData.completed++;
                    break;
                default:
                    break;
            }

            return barChartData;
        }, {failed: 0, completed: 0})
    }

    return parsedActivities;
};

const calculatePercentValue = (a, b) => {
    if (b === 0) {
        return 100.0;
    }

    return (a / b) * 100;
};
