import {deleteInterval} from "../service/IntervalService";

export const onIntervalDelete = async e => {
    e.preventDefault();
    const intervalId = e.target.dataset.id;
    await deleteInterval(intervalId);
    document.querySelector(`#interval-${intervalId}`).remove();
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
