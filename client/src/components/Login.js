import React, { useState } from "react";

function Login( {onLogin} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(False)

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
                res => res.json()
                .then(user => onLogin(user))
            }
            else {
                setError(True)
            }
        })
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
                <h1>Add a New Contact</h1>
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
            </main>
        </div>
    )
}

export default Login