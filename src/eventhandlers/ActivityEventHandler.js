import {markActivityAsDone} from "../service/ActivityService";

export const onMarkActivityAsDone = e => {
    const button = e.currentTarget;
    markActivityAsDone(button.dataset.id);
    button.parentNode.remove();
};
