import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Logo from '../../logo/logo.png';

import './Navbar.css';

import { useAuth } from '../../contexts/AuthContext'

function Navbar() {

    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()

    const navigate = useNavigate()


    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate("/login")
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div className="nav-b">
            <nav className="nav nav-pills nav-fill d-flex justify-content-center">
                <div>
                    <Link aria-current="page" to="/">
                        <img src={Logo} className="img-fluid" />
                    </Link>
                </div>
                <Link className="nav-link hover-underline-animation" to="/DSA"><h4>DSA</h4></Link>
                <Link className="nav-link hover-underline-animation" to="/OS"><h4>OS</h4></Link>
                <Link className="nav-link hover-underline-animation" to="/CN"><h4>CN</h4></Link>
                <Link className="nav-link hover-underline-animation" to="/login" onClick={handleLogout}><h4>Logout</h4></Link>
            </nav>
        </div>

    )
}

export default Navbar