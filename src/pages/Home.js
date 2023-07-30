import React from 'react';
import HomeTopicCard from '../components/HomeTopicCard/HomeTopicCard';
import { Link } from "react-router-dom";
import subjects from '../Questions/Subject';
import './Home.css';
import { useNavigate } from "react-router-dom";

import Logo from '../logo/logo.png';

import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';


function Home() {

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
    <div className='App DSA-Background'>
      <div className='d-flex home-nav'>
        <Link to="/">
          <img className='img-fluid' src={Logo} />
        </Link>
        <Link className='logout-link hover-underline-animation' to="/login" onClick={handleLogout}>Logout</Link>
      </div>
      <h1 className="app-heading2 text-center mb-3 mt-3">Welcome to CS-Tracker</h1>
      <h3 className="app-heading2 text-center mb-3 mt-3">CS Tracker helps you track your progress in solving questions.</h3>
      <h3 className="app-heading2 text-center mb-3 mt-3">Let's get started with the most popular subjects.</h3>
      <HomeTopicCard subjects={subjects}></HomeTopicCard>
    </div>
  );
}

export default Home;
