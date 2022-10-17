import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiConfig from "./config";
import { useNavigate } from "react-router-dom";
import AppContext from './AppContext';
export default function Login() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {state, dispatch} = useContext(AppContext);
    const LoginUser = () => {
        fetch(`${apiConfig.authapi}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("email", email);
                    dispatch({type: 'LOGIN'})
                    navigate('/');
                }
            }).catch(err => {
                handleOpen();
            });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-center flex-column" style={{ height: '80vh' }}>
                    <h2>Sign In</h2>
                    <img className="mt-5" src="images/login.svg" style={{ width: "40%" }} alt="" />
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="standard" fullWidth />
                    </div>
                    <div className="mt-5">
                        <Button variant="contained" onClick={LoginUser}>Login</Button>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Incorrect email or password !
                </Alert>
            </Snackbar>
        </div>
    )
}
