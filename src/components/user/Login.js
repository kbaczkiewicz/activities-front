import React from 'react';
import {Credentials, Message} from "../../models/models";
import {getAuthService} from "../../service/AuthService";
import {Messages} from "../common/Messages";
import {addMessage} from "../../service/MessageService";


const Login = () => {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
    const handleLogin = async event => {
        try {
            event.preventDefault();
            await getAuthService().login(new Credentials(emailInput.current.value, passwordInput.current.value));
            window.location.reload();
        } catch (error) {
            addMessage('login', new Message('danger', 'Nieprawidłowy email lub hasło'));
            window.location.reload();
        }
    };

    return (
        <div className='container'>
            <Messages sessionKey='login'/>
            <div className='row'>
                <div className='col-4 offset-8 margin-top-100'>
                    <form id='login-form' onSubmit={handleLogin}>
                        <div className='form-group'>
                            <h2>Logowanie</h2><br />
                            <label>Email</label>
                            <input className='form-control' type='email' ref={emailInput}/><br/>
                            <label>Hasło</label>
                            <input className='form-control' type='password' ref={passwordInput}/><br/>
                            <button className='btn btn-success' type='submit'>Zaloguj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;
