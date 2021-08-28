import React from "react";
import {addMessage} from "../../service/MessageService";
import {Message, PasswordChange} from "../../models/models";
import {changePassword} from "../../service/User";

const onPasswordChange = e => {
    e.preventDefault();
    const [oldPassword, newPassword, newPasswordRepeat] =
        [
            e.target.children[0].children[1].value,
            e.target.children[1].children[1].value,
            e.target.children[2].children[1].value
        ];

    changePassword(new PasswordChange(oldPassword, newPassword, newPasswordRepeat))
        .then(() => {
            addMessage('interval', new Message('success', 'Zmieniono hasło'));
            console.log('then');
            window.location.href = '/intervals';
        })
        .catch(e => {
            addMessage('interval', new Message('danger', 'Nie udało się zmienić hasła'));
            console.log('catch');
            window.location.href = '/intervals';
        })
};

export const ChangePassword = () => {
    return <div className='container'>
        <div className='row'>
            <div className='col-10 offset-1'>
                <h2>Zmień hasło</h2>
            </div>
            <div className='col-6 offset-3'>
                <form onSubmit={onPasswordChange}>
                    <div className='form-group'>
                        <label>Obecne hasło</label>
                        <input type='password' className='form-control' name='currentPassword' />
                    </div>
                    <div className='form-group'>
                        <label>Nowe hasło</label>
                        <input type='password' className='form-control' name='newPassword' />
                    </div>
                    <div className='form-group'>
                        <label>Powtórz nowe hasło</label>
                        <input type='password' className='form-control' name='newPasswordRepeat' />
                    </div>
                    <button type='submit' className='btn btn-success'>Zmień hasło</button>
                </form>
            </div>
        </div>
    </div>
};
