import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { useModal } from "../../context/Modal";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState({})
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        const inputs = [email, username, firstName, lastName, password, confirmPassword];
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i]
            if (input.length === 0) {
                errors['required'] = "*Please fill in all of the fields."
            }
        }
        if (username.length < 4) { errors["username"] = "*Username cannot be less than 4 characters." }
        if (password.length < 6) { errors["password"] = "*Password cannot be less than 6 characters." }
        if (password !== confirmPassword) { errors["confirmPassword"] = "*Password confirmation does not match." }
        setValidationErrors(errors)
    }, [username, password, confirmPassword, email, firstName, lastName])

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(() => closeModal())
                .catch(async (res) => {
                    const data = await res.json();
                    await (console.log(data))
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <ul className="errors">
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <ul className="errors">
                {Object.values(validationErrors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className="signup-text">
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="signup-input"
                    placeholder="Email"
                />
            </label>
            <label className="signup-text">
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="signup-input"
                    placeholder="Username"
                />
            </label>
            <label className="signup-text">
                First Name
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="signup-input"
                    placeholder="First Name"
                />
            </label>
            <label className="signup-text">
                Last Name
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="signup-input"
                    placeholder="Last Name"
                />
            </label>
            <label className="signup-text">
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="signup-input"
                    placeholder="Password"
                />
            </label>
            <label className="signup-text">
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="signup-input"
                    placeholder="Confirm Password"
                />
            </label>
            <button type="submit" className="signup-button" disabled={Object.values(validationErrors).length > 0}>Sign Up</button>
        </form>
    );
}

export default SignupFormPage;
