import axios from 'axios';
import {getTokenProvider} from "../auth/TokenProvider";

export class Client {
    constructor() {
        const token = getTokenProvider().getToken();
        this._client = axios.create({
            baseURL: 'http://localhost/api/',
            timeout: 9000,
            headers: {'Content-type': 'application/json', 'Authorization': token ? 'Bearer ' + token : null},
        });
    }

    login(credentials) {
        return this._make_action('login_check', {
            username: credentials.email,
            password: credentials.password
        }, 'post');
    }

    register(credentials) {
        return this._make_action(
            'user',
            {
                email: credentials.email,
                password: credentials.password
            },
            'post');
    }

    getIntervals(filters = '') {
        return this._make_action(`interval?${filters}`, [], 'get');
    }

    getInterval(intervalId) {
        return this._make_action(`interval/${intervalId}`, {}, 'get');
    }

    saveInterval(interval) {
        return this._make_action('interval', interval.serialize(), 'post');
    }

    deleteInterval(intervalId) {
        return this._make_action(`interval/${intervalId}`, {}, 'delete');
    }

    getActivityTypes() {
        return this._make_action('activityType', {}, 'get');
    }

    getActivities(intervalId, filters = '') {
        return this._make_action(`activity/${intervalId}?${filters}`, {}, 'get');
    }

    saveActivity(activity) {
        return this._make_action('activity', activity, 'post');
    }

    markActivityAsDone(activityId) {
        return this._make_action(`activity/${activityId}`, [], 'patch')
    }

    addActivities(activityIds, intervalId) {
        return this._make_action(`interval/${intervalId}/activities`, {ids: activityIds}, 'patch')
    }

    getIntervalStats(intervalId) {
        return this._make_action(`intervalStats/${intervalId}`, [], 'get')
    }

    getProfile() {
        return this._make_action('account', [], 'get');
    }

    changePassword(oldPassword, password, passwordRepeat) {
        return this._make_action(
            'account',
            {oldPassword: oldPassword, password: password, passwordRepeat: passwordRepeat},
            'patch'
        );
    }

    getUniqueActivities(intervalId) {
        return this._make_action(`activity/${intervalId}/unique`, {}, 'get');
    }

    getSavedActivities() {
        return this._make_action('savedActivity', {}, 'get');
    }

    _make_action(url, data, method) {
        const config = {
            method: method,
            url: url,
            data: data
        };

        return this._client.request(config)
    }
}

export const getClient = function () {
    return new Client();
};
