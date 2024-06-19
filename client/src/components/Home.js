import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import AddStudent from './AddStudent'
import Students from './Students'

function Home({ error, setError, user, students, setStudents }) {
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
        history.push('/students')
        
    }

    function handleSubmit3(e) {
        e.preventDefault()
    }
    if (students.length === 0) {
    return (
        <div>
            <main>
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
                <form onSubmit={handleSubmit}>
                <h3>Click here to add a student</h3>
                    <div>
                        <p></p>
                        <button type="submit">Add a student</button>
                    </div>
                </form>
                {showComponent && <AddStudent students={students} setStudents={setStudents} setError={setError} error={error}/>}
            </main>
        </div>
            )} 
    else {
        return (
            <div>
                <Students students={students} setStudents={setStudents}/>
            </div>
        )
    }
}

export default Home