import React, { useState } from "react";
import SignInServices, {SignedInUser} from "../../services/signIn";
import {LoginCredentials} from "../../services/signIn";
import "./loginPage.scss";
import {login} from "../../slices/userSlice";
import store from "../../store";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginCredential: LoginCredentials = {
            email,
            password
        };

        try {
            const user: SignedInUser = await SignInServices.login(loginCredential);
            store.dispatch(login(user));
            Swal.fire({
                title: 'Login Successful',
                text: 'You will be redirected to the home page in a few seconds',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            }).then( () => {
                navigate("/todo-list");
            });
        } catch (err: any) {
            Swal.fire({
                title: 'Login Failed',
                text: 'Please check your email and password and try again',
                icon: 'error',
                showConfirmButton: true,
            })
        } finally {}
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            placeholder="Enter your Email Address"
                            required
                        />
                        {
                            emailError && (<p style={{color: "red"}}> Email is not valid </p>)
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" disabled={ emailError.length > 1 }>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;