import React, { useEffect, useState } from 'react'
import apiConfig from "./config";
import { useNavigate } from "react-router-dom";

export default function AuthHoc(Component) {
    function NewComponent() {
        const navigate = useNavigate();
        useEffect(() => {
            fetch(`${apiConfig.authapi}/isAuthenticated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status === 401) {
                        navigate('/login');
                    } else {
                        return <Component />;
                    }
                });
        }, []);
        return <Component />;
    }
    return NewComponent;
}
