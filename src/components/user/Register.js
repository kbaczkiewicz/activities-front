import React from 'react';
import {Client} from "../../client/Client";
import {Credentials} from "../../models/models";
import {Redirect} from "react-router-dom";

function buildJSX(emailInput, passwordInput, token, handleRegister) {
    return token
        ? <Redirect to='/intervals'/>
        : <div className='container'>
            <div className='row'>
                <div className='col-4 offset-8 margin-top-100'>
                    <form id='register-form' onSubmit={handleRegister}>
                        <div className='form-group'>
                            <h2>Rejestracja</h2><br />
                            <label>Email</label>
                            <input className='form-control' type='email' ref={emailInput}/><br/>
                            <label>Hasło</label>
                            <input className='form-control' type='password' ref={passwordInput}/><br/>
                            <button className='btn btn-success' type='submit'>Zarejestruj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
}

const Register = props => {
    const emailInput = React.createRef();
    const passwordInput = React.createRef();
    const handleRegister = async event => {
        try {
            event.preventDefault();
            const client = new Client();
            await client.register(new Credentials(emailInput.current.value, passwordInput.current.value));
            window.location.href = "/login";
        } catch (error) {
        }
    };

    return (
        buildJSX(emailInput, passwordInput, props.token, handleRegister)
    )
};

export default Register;
