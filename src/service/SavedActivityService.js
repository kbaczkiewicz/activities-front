import {getClient} from "../client/Client";
import {SavedActivity} from "../models/models";

export  const getSavedActivities = async () => {
    const response = await getClient().getSavedActivities();
    if (response) {
        return response.data.data.map(savedActivityData => {
            return new SavedActivity(savedActivityData.name, savedActivityData.typeId)
        })
    }
};
