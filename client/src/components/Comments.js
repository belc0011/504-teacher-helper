import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory, useLocation } from 'react-router-dom'

function Comments() {
    const location = useLocation()
    const [studentInfo, setStudentInfo] = useState("")
    const [accommodationToDisplay, setAccommodationToDisplay] = useState("")
    const [accommodations, setAccommodations] = useState([])

    const url = location.pathname
    const parts = url.split("/")
    const accommodationIdString = parts[3]
    const studentIdString = parts[2]
    const accommodationId = parseInt(accommodationIdString)
    const studentId = parseInt(studentIdString)
    
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
          comment: ""
        },
        onSubmit: (values, { resetForm }) => {
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
            setAccommodationToDisplay(data.accommodations)
            resetForm()
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
})
    useEffect(() => {
        
        fetch(`http://127.0.0.1:5555/comments/${studentId}/${studentId}`, {
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
        <h2>Displaying accommodations for {studentInfo}: </h2>
        {accommodationToDisplay ? (
            <div>
                <h3>{accommodationToDisplay.description}</h3>
                {accommodationToDisplay.comment ? (<li>{accommodationToDisplay.comment}</li>) : null } 
            </div>
        ) : (
            <h3>No accommodations</h3>
        )}
        <h3>You can add a comment (or change the existing comment) below: </h3>
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="comment">Comment to add/update: </label>
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