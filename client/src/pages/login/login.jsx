import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css";
import { useContext } from 'react';
import { UserContext } from '../../components/UserContext';
import { BASE_URL } from '../../helper.js';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [userError, setUserError] = useState(false);
    const [passworderror, setPassworderror] = useState(false);
    const [showerror, setShowerror] = useState(false);
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const handleusername = (e) => {

        setShowerror(false);
        setUserError(false);
        setPassworderror(false);
        setUsername(e.target.value);
    }
    const handlepassword = (e) => {
        setPassword(e.target.value);
    }
    const letsDoIt = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { username, password });
            const userId=response.data;
            localStorage.setItem("userId",userId);
            localStorage.setItem("username",username);
            updateUser({userId,username});
            navigate("/Home");


        }
        catch (err) {
            if (err.response.data) {
                if (err.response.data === 'Incorrect username') setUserError(true);
                else if (err.response.data === 'Incorrect password') setPassworderror(true);
                else setShowerror(true);
            }
            else setShowerror(true);

        }
    }
    const getRegistered = () => {
        navigate('/register');
    }
    return (
        <div>
            <div className="loginForm">
                {showerror && <span>There is an error</span>}
                <h1>LOGIN</h1>
                {userError && <span>Incorrect Username</span>}
                <input type="text" className="username" placeholder='Username' onChange={(e) => handleusername(e)} />
                {passworderror && <span>Incorrect Password</span>}
                <input type="password" className="password" placeholder='Password' onChange={(e) => handlepassword(e)} />
                <button type='submit' onClick={letsDoIt}> SUBMIT</button>
            </div>
            <div className="register">
                <span>Don't have an account?</span>
                <button type="submit" className="create" onClick={getRegistered}>CREATE AND ACCOUNT</button>
            </div>

        </div>
    )
}
