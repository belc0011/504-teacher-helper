import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import StudentCard from './StudentCard'

function Comments() {
    const location = useLocation()
    const [studentInfo, setStudentInfo] = useState({})

    const url = location.pathname
    const id = url.slice(-1) //holds student id
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
            setStudentInfo(data)
            })
        .catch((error) => {
            console.error(error);
        });
    }, [])

    function handleClick(e) {
        return ""
    }
    return (
    <div>
        <h3>Displaying accommodations for {studentInfo.first_name} {studentInfo.last_name}: </h3>
        {studentInfo.accommodations ? studentInfo.accommodations.map((accommodation) => {
            return <div key={id}><h3>{accommodation.description}</h3><button onClick={handleClick}>Click to add an accommodation</button></div>
        }) : <h2>No accommodations</h2>}
    </div>
    )
}

export default Comments