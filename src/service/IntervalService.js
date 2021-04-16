import {getClient} from "../client/Client";
import {Interval} from "../models/models";
import React from "react";

export const getIntervals = async (filters = []) => {
    const intervalData = await getClient().getIntervals(filters.join('&'));
    if (intervalData) {
        try {
            return intervalData.data.data.map(intervalArray => {
                return new Interval(
                    intervalArray.id,
                    intervalArray.name,
                    intervalArray.status,
                    intervalArray.dateStart,
                    intervalArray.dateEnd
                )
            });
        } catch (e) {
            return [];
        }
    }
};

export const getInterval = async intervalId => {
    const response = await getClient().getInterval(intervalId);
    const intervalData = response.data.data;

    return new Interval(
        intervalData.id,
        intervalData.name,
        intervalData.status,
        intervalData.dateStart,
        intervalData.dateEnd
    )
};

export const saveInterval = async interval => {
    const response = await getClient().saveInterval(interval);
    const intervalId = response.data.data.intervalId;

    return new Interval(
        intervalId,
        interval.name,
        interval.status,
        interval.dateStart,
        interval.dateEnd,
    );
};

export const deleteInterval = intervalId => {
    getClient().deleteInterval(intervalId);
};
