import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '@app/service/auth.service';
import customdecksData from '@app/data/customdecks.data';
import { useAuth } from '@app/tool/AuthContext';
import '@app/style/form.css';

function ConfirmEmail() {
    const { token } = useParams();
    const { setIsLogged } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        AuthService.confirmEmail(token)
            .then(res => {
                setMessage(res.message);
                customdecksData.createCustomDeck('Custom Deck').catch(() => {});
                setCountdown(5);
            })
            .catch(() => {
                toast.error('Oops! Something went wrong...');
            });
    }, []);

    useEffect(() => {
        if (countdown === null) return;
        if (countdown === 0) {
            setIsLogged(true);
            navigate('/learn');
            return;
        }
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <div className="component-confirm-email form">
            {message && (
                <div className="message-box">
                    <div>{message}</div>
                    {countdown !== null && (
                        <>
                            <br />
                            <div>Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ConfirmEmail;
