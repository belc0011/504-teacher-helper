import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory, useLocation } from 'react-router-dom'
import StudentCard from './StudentCard'

function Comments() {
    const location = useLocation()
    const [studentInfo, setStudentInfo] = useState("")
    const [refreshPage, setRefreshPage] = useState(false);
    const [accommodationToDisplay, setAccommodationToDisplay] = useState("")
    const [accommodations, setAccommodations] = useState([])
    const [comment, setComment] = useState("")

    const url = location.pathname
    const parts = url.split("/")
    const accommodationIdString = parts[3]
    const studentIdString = parts[2]
    const accommodationId = parseInt(accommodationIdString)
    const studentId = parseInt(studentIdString)
    const [showComponent, setShowComponent] = useState(false);
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
          comment: ""
        },
        onSubmit: (values) => {
        fetch(`http://127.0.0.1:5555/comments/${studentId}/${accommodationId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            credentials: 'include'
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error fetching student data');
            }
        })
        .then(data => {
            console.log(data);
            setAccommodationToDisplay(data.accommodations);
            setAccommodations(data.accommodations);
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
})
    useEffect(() => {
        console.log(studentId)
        console.log(accommodationId)
        fetch(`http://127.0.0.1:5555/join_table_student/${studentId}`, {
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
            setStudentInfo(data.student)
            console.log(data.student)
            const accommodation = data.accommodations.find((accommodation) => {
                return accommodation.id===accommodationId
            })
            setAccommodationToDisplay(accommodation)
            setAccommodations(data.accommodations)
            })

        .catch((error) => {
            console.error(error);
        });
    }, [])


    return (
    <div>
        <h3>Displaying accommodations for {studentInfo}: </h3>
        {accommodationToDisplay ? (
            <div>
                <h3>{accommodationToDisplay.description}</h3>
                {accommodationToDisplay.comment ? (<li>{accommodationToDisplay.comment}</li>) : null } 
            </div>
        ) : (
            <h2>No accommodations</h2>
        )}
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="comment">Comment to add: </label>
            <div>
                <select type="dropdown" 
                name="comment"
                id="comment" 
                value={formik.values.comment} 
                onChange={formik.handleChange}>
                    <option value="default">Select One</option>
                    <option value="Helpful">5: Helpful</option>
                    <option value="Somewhat helpful">4: Somewhat Helpful</option>
                    <option value="Neutral">3: Neutral</option>
                    <option value="Changes needed">2: Changes needed</option>
                    <option value="Remove">1: Remove accommodation</option>
                </select>
            </div>
            <div>
                <p></p>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    )
}

export default Comments