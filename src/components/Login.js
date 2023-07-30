import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import Logo from '../logo/logo.png';

import './Login.css';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)

    }

    // className='d-flex align-items-center justify-content-center' style={{ maxWidth:"400px" }}
    return (
        <>
            <Container>
                <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                    <div className='w-100' style={{ maxWidth: "400px" }}>
                        <div className='login-logo d-flex align-items-center justify-content-center'>
                            <img src={Logo} alt='logo' />
                        </div>
                        <Card className='border'>
                            <Card.Body>
                                <h2 className='text-center mb-4 hover-underline-animation'>Log In</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' ref={passwordRef} required />
                                    </Form.Group>
                                    <Button disabled={loading} className='w-100 mt-4' type='submit'>Log In</Button>
                                </Form>
                                <div className='w-100 text-center mt-3'>
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className='w-100 text-center mt-2'>
                            Need an account? <Link to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
