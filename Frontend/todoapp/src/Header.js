import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import AppContext from './AppContext';
export default function Header() {
    const { state, dispatch } = React.useContext(AppContext);
    const Logout = () => {
        dispatch({ type: 'LOGOUT' });
         localStorage.clear()
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task List
                </Typography>
                <VpnKeyIcon />
                {
                    state ? <Button color="inherit" onClick={Logout} component={Link} to="/login">Logout</Button> : <div>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <AccountCircleIcon />
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </div>
                }

            </Toolbar>
        </AppBar>
    )
}
