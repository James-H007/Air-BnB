import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'
import { useModal } from '../../context/Modal';


//You can import your your ModalContext
function LoginFormPage() {
    const { closeModal } = useModal() //DON'T FORGET THE PARATHESIS
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => { //This useEffect cannot be underneath the if(sessionUser conditonal)
        const errors = {};
        if (credential.length < 4) { errors["credential"] = "Username cannot be less than 4 characters." }
        if (password.length < 6) { errors["password"] = "Password cannot be less than 6 characters." }
        setValidationErrors(errors);
    }, [credential, password])

    if (sessionUser) return (
        <Redirect to="/" />
    );



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => closeModal())
            .catch(async (res) => {
                const data = await res.json();
                // await (console.log(data))
                // await (console.log(errors))
                if (data && data.errors) {
                    setErrors(data.errors)
                    // await (console.log(errors))
                };
            });
    }

    const demoLogin = () => {
        setCredential("Demo-lition")
        setPassword("password")
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => closeModal())
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="login-form">
                <ul className='invalid-cred'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <ul className='validation-errors'>
                    {Object.values(validationErrors).map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='login-text'>
                    Username or Email
                    <input
                        type="text"
                        placeholder='Enter in a username'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className='login-text'>
                    Password
                    <input
                        type="password"
                        placeholder='Enter in a password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='login-input'
                    />
                </label>
                <div className='buttons'>
                    <button type="submit" className='login-button' disabled={Object.values(validationErrors).length > 0}>Log In</button>
                    <button className="demo-login" onClick={demoLogin}>Log in as Demo User</button>
                </div>
            </form>

        </>
    );
}

export default LoginFormPage;
