import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './ForgotPassword.js';

import Logo from '../logo/logo.png';

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)

    }
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
                                <h2 className='text-center mb-4 hover-underline-animation'>Password Reset</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' ref={emailRef} required />
                                    </Form.Group>
                                    <Button disabled={loading} className='w-100 mt-4' type='submit'>Reset Password</Button>
                                </Form>
                                <div className='w-100 text-center mt-3'>
                                    <Link to="/login">login</Link>
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
