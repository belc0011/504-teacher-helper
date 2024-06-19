import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import AddStudent from './AddStudent'

function Home({ setStudents, error, setError, user }) {
    const [accommodation, setAccommodation] = useState("")
    const [showComponent, setShowComponent] = useState(false);
    const history = useHistory()

    function handleAccommodation(e) {
        setAccommodation(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setShowComponent(true)
    }
    function handleSubmit2(e) {
        e.preventDefault()
        console.log(user)
        fetch(`http://127.0.0.1:5555/students`, {
            method: "GET",
            headers: {
              "Cookie": "cookieName=cookieValue"
            },
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setStudents(data))
                history.push("/students")
            }
            else {
                setError(true)
            }
        })
        .catch(error => {
            console.error("Error parsing JSON:", error); // Log JSON parsing errors
            setError(true)
        })
    }

    function handleSubmit3(e) {
        e.preventDefault()
    }
    return (
        <div>
            <main>
                <form onSubmit={handleSubmit}>
                <h3>Click here to add a student</h3>
                    <div>
                        <p></p>
                        <button type="submit">Add a student</button>
                    </div>
                </form>
                <form onSubmit={handleSubmit2}>
                    <h3>Click here to pull up a list of all students</h3>
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <form onSubmit={handleSubmit3}>
                    <h3>Search by accommodation: </h3>
                    <label htmlFor="group">Group</label>
                    <div>
                        <select type="dropdown" id="accommodation" value={accommodation} onChange={handleAccommodation}>
                            <option value="default">Select One</option>
                            <option value="preferential-seating">Preferential Seating</option>
                            <option value="guided-notes">Guided Notes</option>
                            <option value="extra-time">Extra Time</option>
                            <option value="small-group-testing">Small Group Testing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {showComponent && <AddStudent setError={setError} error={error}/>}
            </main>
        </div>
    )
}

export default Home