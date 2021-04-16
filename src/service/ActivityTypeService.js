import {getClient} from "../client/Client";
import {ActivityType} from "../models/models";

export const getActivityTypes = async () => {
    try {
        const response = await getClient().getActivityTypes();

        return response.data.data.map(type => new ActivityType(type.id, type.name));
    } catch (e) {
        console.log(e);
        return [];
    }
};
