import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {login, logout} from '../../services/auth';

import api from '../../services/api';

import './styles.css';

export default function Logon() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const history = useHistory();
	
	useEffect(() => {
		logout();
	})

    async function handleLogin(e) {
        e.preventDefault();

        try {
			const response = await api.post('login', { username:username, password:password });
			if(response.data.auth) {
				login(response.data.token);
				localStorage.setItem('clientName', response.data.client_name);

				history.push('/map');
			}
        } catch(err) {
			alert('Login Failed, try again');
			console.log(err);
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
					<div className="inputContainer">
						<label>Username:</label>
						<input
							name="usernameInput"
							value={username}
							onChange = {e => setUsername(e.target.value)}
						/>
					</div>
					<div className="inputContainer">
						<label>Password:</label>
						<input
							name="passwordInput"
							type="password"
							onChange = {e => setPassword(e.target.value)}
						/>
					</div>
                    
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}