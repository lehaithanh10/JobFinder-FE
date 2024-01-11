import React, { useState } from 'react';

import './ForgotPassword.scss'


const ForgotPassword = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const handleForgotPassword = () => {
        //Call API
    }

    return (
        <div className='forgot-password-page'>
            <h1 style={{
                paddingBottom: "20px",
                paddingLeft: "8%"
            }}>JobFinder</h1>
            <div className='form-content'>
                <div className='content-main'>
                    <form >
                        <div className='fieldGroup'>
                            <input
                                type='text'
                                name='username'
                                placeholder='User name or email'
                                maxLength={5000}
                                value={username}
                                onChange={e => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </div>
                        <div className='fieldGroup'>
                            <input
                                type='password'
                                name='password'
                                placeholder='New Password'
                                maxLength={500}
                                autoComplete='false'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div className='fieldGroup'>
                            <input
                                type='password'
                                name='password'
                                placeholder='Confirm New Password'
                                maxLength={500}
                                autoComplete='false'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <button
                            type='submit'
                            style={{ color: 'white', fontSize: '17px' }}
                            onClick={handleForgotPassword}
                        >Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;