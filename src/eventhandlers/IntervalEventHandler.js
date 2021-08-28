import {deleteInterval} from "../service/IntervalService";

export const onIntervalDelete = async e => {
    e.preventDefault();
    const intervalId = e.target.dataset.intervalId;
    await deleteInterval(intervalId);
    document.querySelector(`[data-interval-id='${intervalId}']`).parentNode.parentNode.remove();
};

export const onIntervalClick = e => {
    e.preventDefault();
    const intervalId = e.target.dataset.id;
    window.location.href = `/interval/${intervalId}`;
};

export const onIntervalStatsShow = e => {
    e.preventDefault();
    const intervalId = e.target.dataset.id;
    window.location.href = `/intervalStats/${intervalId}`;
};
