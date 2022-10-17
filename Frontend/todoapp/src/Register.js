import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiConfig from "./config";
import { Link } from "react-router-dom";
export default function Register() {
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
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const RegisterUser = () => {
        fetch(`${apiConfig.authapi}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, city, phone, email, password })
        }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    handleOpen();
                }
            });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-center flex-column" style={{ height: '100vh' }}>
                    <h2>Sign Up</h2>
                    <img className="mt-3" src="images/signup.svg" style={{ width: "40%" }} alt="" />
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setFirstname(e.target.value)} label="First Name" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setLastname(e.target.value)} label="Last Name" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setCity(e.target.value)} label="City" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setPhone(e.target.value)} label="Phone" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3 w-75">
                        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="standard" fullWidth />
                    </div>
                    <div className="mt-3">
                        <Button variant="contained" onClick={RegisterUser}>Register</Button>
                    </div>
                    <div className="mt-4">
                        <p>Already Registered? <Link to="/login">Sign In</Link> </p>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User registered successfully !
                </Alert>
            </Snackbar>
        </div>
    )
}
