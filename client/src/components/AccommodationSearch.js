import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom'

function AccommodationSearch() {
    const [accommodation, setAccommodation] = useState("")
    const [studentList, setStudentList] = useState([])

    function handleAccommodation(e) {
        setAccommodation(e.target.value)
    }
    const formik = useFormik({
        initialValues: {
          accommodation: ""
        },
        onSubmit: (values) => {
        fetch(`http://127.0.0.1:5555/search_accommodation?description=${formik.values.accommodation}`, {
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
            setStudentList(data)})
        .catch((error) => {
            console.error(error);
        });
    }
})
    
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1>Search by accommodation: </h1>
                <label htmlFor="group">Accommodation</label>
                <div>
                    <select type="dropdown" 
                    id="accommodation" 
                    name="accommodation"
                    value={formik.values.accommodation} 
                    onChange={formik.handleChange}>
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
            <h1>Students with the selected accommodation:</h1>
            {studentList ? (
                <div>{studentList.map((student) => {
                    return <h3 key={student.id}>{student.first_name} {student.last_name}</h3>
                })}
                    </div>
            ) : (
                <h3>No students to display</h3>
            )}
        </div>
    )
}

export default AccommodationSearch