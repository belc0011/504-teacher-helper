import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import { useFormik } from "formik";

function StudentPage({ }) {
    const location = useLocation()
    const url = location.pathname
    const parts = url.split("/")
    const id = parts[2]
    const [studentToDisplay, setStudentToDisplay] = useState({})
    const [studentData, setStudentData] = useState(false)
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
          accommodation: ""
        },
        onSubmit: (values, { resetForm }) => {
        fetch(`http://127.0.0.1:5555/accommodations/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {setStudentToDisplay(data)
        resetForm() 
        })
        }
    })
    const formik2 = useFormik({
        initialValues: {
          class: ""
        },
        onSubmit: (values, { resetForm }) => {
        fetch(`http://127.0.0.1:5555/students/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {setStudentToDisplay(data)
        resetForm()
        alert("Class successfully added!")}) 
        }
    })
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
    
    function handleDelete(e) {
        history.push(`/delete/${id}`)
    }

    function handleEdit(e) {
        history.push(`/edit_student/${id}`)
    }
    return (
        <div>
            <h1>{studentToDisplay.first_name} {studentToDisplay.last_name}</h1>
            <h3>To delete this student's record, click here:</h3>
            <button onClick={handleDelete}>Click here to delete</button>
            <h3>To edit this student's record, click here:</h3>
            <button onClick={handleEdit}>Click here to edit</button>
            <h2>Accommodations: </h2>
            <h3>(Click on an accommodation to see comments)</h3>
            { studentData ? (
                <div>
                    {studentToDisplay.accommodations ? studentToDisplay.accommodations.map((accommodation) => {
                        return <div key={accommodation.id}><a href={`/comments/${id}/${accommodation.id}`}>{accommodation.description}</a> </div>;
                    }) : <p>No Accommodations</p>}
                </div>
                ) : (
                    <p>No student data to display</p>
                    )}
                <div>
                    { studentToDisplay.classes && studentToDisplay.classes.length > 0 ? (
                        <div>
                            <h2>Classes:</h2>
                            {studentToDisplay.classes.map((classItem) => {
                                return <h3 key={classItem.name}>{classItem.name}</h3>;
                            })}
                        </div>
                    ) : null}
                </div>
            <form onSubmit={formik.handleSubmit}>
                <h2>To add an accommodation for this student, select the accommodation from the dropdown and click Submit </h2>
                <label htmlFor="new-accommodation">Accommodations</label>
                        <div>
                            <select type="dropdown" 
                            name="accommodation"
                            id="accommodation" 
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
                        <h1>   </h1>
                        <h1>  </h1>
                        <h1>  </h1>
                <button type='submit'>Submit</button>
            </form>
            <br></br>
            <br></br>
            <form onSubmit={formik2.handleSubmit}>
                <div>
                <h2>To add a class for this student, type the class in the text box and click Submit </h2>
                    <label htmlFor="new-class">Add a new class:</label>
                    <input type="text"
                    id="class"
                    name="class"
                    value={formik2.values.class}
                    onChange={formik2.handleChange}
                    />
                </div>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default StudentPage