import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom'

function StudentPage({ }) {
    const location = useLocation()
    const url = location.pathname
    const id = url.slice(-1)
    const [studentToDisplay, setStudentToDisplay] = useState({})
    const [newAccommodation, setNewAccommodation] = useState("")
    const [accommodationToDisplay, setAccommodationToDisplay] = useState("")
    const [studentData, setStudentData] = useState(false)

    function handleSubmit(e) {
        fetch(`http://127.0.0.1:5555/add_accommodation/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, accommodation: newAccommodation}),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setAccommodationToDisplay(data))
        setNewAccommodation("default")
        alert("Acommodation successfully added!")
    }
    useEffect(() => {
        console.log(id)
        fetch(`http://127.0.0.1:5555/students/${id}`, {
            method: "GET",
            credentials: 'include'
            })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } 
            else {
                throw new Error('Error fetching student data');
            }
        })
        .then((data) => {
            console.log(data)
            setStudentToDisplay(data)
            setStudentData(true)})
        .catch((error) => {
            console.error(error);
        });
    }, [])
    
    function handleNewAccommodation(e) {
        setNewAccommodation(e.target.value)
    }
    return (
        <div>
            <h1>Student info:</h1>
            { studentData ? (
                <div>
                    <h2>{studentToDisplay.first_name} {studentToDisplay.last_name}</h2>
                    {studentToDisplay.accommodations ? studentToDisplay.accommodations.map((accommodation) => {
                        return <div><a href={`/comments/${id}/${accommodation.id}`} key={id}>{accommodation.description}</a> </div>;
                    }) : <p>No Accommodations</p>}
                </div>
                ) : (
                    <p>No student data to display</p>
                    )}
            <form onSubmit={handleSubmit}>
                <h2>To add an accommodation for this student, select the accommodation from the dropdown and click Submit </h2>
                <label htmlFor="new-accommodation">Accommodations</label>
                        <div>
                            <select type="dropdown" id="accommodation" value={newAccommodation} onChange={handleNewAccommodation}>
                                <option value="default">Select One</option>
                                <option value="preferential-seating">Preferential Seating</option>
                                <option value="guided-notes">Guided Notes</option>
                                <option value="extra-time">Extra Time</option>
                                <option value="small-group-testing">Small Group Testing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <h1>   </h1>
                        <h1>  </h1>
                        <h1>  </h1>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default StudentPage