import "./signUp.scss";
import React, {useState} from "react";
import SignUpServices, {SignUpInterface, SignUpResponse} from "../../services/signUp";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const[emailError, setEmailError] = useState<string>("");
    const[usernameError, setUsernameError] = useState<string>("");
    const[passwordError, setPasswordError] = useState<string>("");
    const navigate = useNavigate();
    const[response, setResponse] = useState<SignUpResponse | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (value.length < 3) {
            setUsernameError("Username must be at least 3 characters long");
        } else {
            setUsernameError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const passwordRex = /^(?=.*[A-Za-z])(?=.*\d|.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRex.test(value)) {
            setPasswordError("Invalid Password. Please try again");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const signUpData: SignUpInterface = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
        }

        try{
            const response: SignUpResponse = await SignUpServices.signUp(signUpData);
            setResponse(response);
            Swal.fire({
                title: 'Sign up Successful',
                text: 'You will be redirected to the Login page in a few seconds',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            }).then( () => {
                navigate("/");
            });
        } catch (error: Error | any){
            console.log(error);
            const errorMessage = error?.message || "Sign up failed. Please try again";
            setResponse(errorMessage);
            Swal.fire({
                title: 'Sign up failed',
                text: errorMessage,
                icon: 'error',
                showConfirmButton: true,
            })
        }


    };

    return (
        <div className="signin-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="signin-form">
                {/* Email */}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleEmailChange(e)}
                        required
                    />
                    {
                        emailError && (<p style={{color: "red"}}> {emailError} </p>)
                    }
                </div>

                {/* Username */}
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={e => handleUserNameChange(e)}
                        required
                    />
                    {
                        usernameError && (<p style={{color: "red"}}> {usernameError} </p>)
                    }
                </div>

                {/* Password */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={e => handlePasswordChange(e)}
                        required
                    />
                    {
                        passwordError && (
                            <div style={{color: "red"}}>
                                <ul>
                                    <li> The Password must be at least 8 characters long. </li>
                                    <li> Contain at least one uppercase letter or one lowercase letter. </li>
                                    <li> OR one number or one special character. </li>
                                </ul>
                            </div>
                        )
                    }
                </div>

                {/* Submit Button */}
                <button type="submit" className={classNames("signin-button", { 'disabled': !formData.email || !formData.username || !formData.password })}
                        disabled={ emailError.length > 1 || usernameError.length > 1 || passwordError.length > 1}>
                    Sign Up
                </button>
            </form>
            <p>Already have an account? <a onClick={() => navigate("/")}>Login</a></p>
        </div>
    );

};

export default SignUpPage;