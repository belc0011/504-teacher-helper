import React, { useState } from "react";
import SignUp from './SignUp'

function Login( {onLogin} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const [showComponent, setShowComponent] = useState(false);

    function handleSubmit(e) {
        e.preventdefault()
        fetch("http://127.0.0.1:5555/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => onLogin(user))
            }
            else {
                setError(true)
            }
        })
    }
    function handleClick() {
        setShowComponent(true); // Set showComponent to true when the button is clicked
    }

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    return (
        <div>
            <main>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <div>
                        <input type="text" placeholder="Username" id="username" value={username} onChange={handleUsername}/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input type="text" placeholder="Password" id="password" value={password} onChange={handlePassword}/>
                    </div>
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <p>Or, if you don't have an account...</p>
                    <div>
                        <button onClick={handleClick}>Sign Up</button>
                        {showComponent && <SignUp/>}
                    </div>
            </main>
        </div>
    )
}

export default Login