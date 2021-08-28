import React, {useEffect, useState} from 'react';
import {addMessage} from "../../service/MessageService";
import {Message} from "../../models/models";
import {getProfile} from "../../service/User";


export const Profile = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getProfile()
            .then(profile => setProfile(profile))
            .catch(e => {
                console.error(e);
                window.location.href = '/';
                addMessage('login', new Message('danger', 'Zostałeś wylogowany'));
        });

    }, []);

    return <div className='container'>
        <div className='row'>
            <div className='col-12'>
            </div>
        </div>
        <div className='row'>
            <div className="col-10 offset-1">
                <h2>Twój profil</h2>
            </div>
            <div className='col-6 offset-3'>
                <p>Email: <b>{profile.email}</b></p>
                <p>Aktywne interwały: <b>{profile.activeIntervals}</b></p>
                <p>Ukończone interwały: <b>{profile.endedIntervals}</b></p>
                <p>Nierozpoczęte interwały: <b>{profile.intervalsToStart}</b></p>
                <p>Ukończone aktywności: <b>{profile.completedActivities}</b></p>
                <p>Nieukończone aktywności: <b>{profile.failedActivities}</b></p>
            </div>
            <div className="col-2 offset-8">
                <a href='/change-password' className='btn btn-info'>Zmień hasło</a>
            </div>
        </div>
    </div>;
};
