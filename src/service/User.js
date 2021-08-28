import {getClient} from "../client/Client";
import {Profile} from "../models/models";

export const getProfile = async () => {
    const response = await getClient().getProfile();
    const data = response.data.data;
    console.log(data);

    return new Profile(
        data.email,
        data.activeIntervals,
        data.endedIntervals,
        data.intervalsToStart,
        data.completedActivities,
        data.failedActivities
    );
};

export const changePassword = async changePassword => {
    try {
        await getClient().changePassword(changePassword.oldPassword, changePassword.password, changePassword.passwordRepeat);
    } catch (e) {
        throw new Error('Nie udało się zmienić hasła')
    }
};
