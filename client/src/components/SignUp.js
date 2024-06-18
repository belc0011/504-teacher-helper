import React, { useState } from 'react'


function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    function handleFirstName(e) {
        setFirstName(e.target.value)
    }
    function handleLastName(e) {
        setLastName(e.target.value)
    }
    function handleUserName(e) {
        setUserName(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handleSubmit(e) {
        e.preventdefault()

    }
    return (
    <div>
            <main>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name: </label>
                    <div>
                        <input type="text" id="first_name" value={firstName} onChange={handleFirstName}/>
                    </div>
                    <label htmlFor="last_name">Last Name: </label>
                    <div>
                        <input type="text" id="last_name" value={lastName} onChange={handleLastName}/>
                    </div>
                    <label htmlFor="username">Username: </label>
                    <div>
                        <input type="text" id="username" value={userName} onChange={handleUserName}/>
                    </div>
                    <label htmlFor="password">Password: </label>
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

export default SignUp