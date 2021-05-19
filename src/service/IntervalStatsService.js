import {IntervalStats} from "../models/models";
import {getClient} from "../client/Client";

export const getIntervalStats = async intervalId => {
    const response = await getClient().getIntervalStats(intervalId);
    console.log(response.data.data.completedAmount);
    return new IntervalStats(
        response.data.data.completedAmount,
        response.data.data.failedAmount,
        response.data.data.completedPercent
    )
};
