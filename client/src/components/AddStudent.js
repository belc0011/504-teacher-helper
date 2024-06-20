import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

function AddStudent({ setError }) {
    const [studentFirstName, setStudentFirstName] = useState("")
    const [studentLastName, setStudentLastName] = useState("")
    const [grade, setGrade] = useState("")

    function handleFirstName(e) {
        setStudentFirstName(e.target.value)
    }

    function handleLastName(e) {
        setStudentLastName(e.target.value)
    }

    function handleGrade(e) {
        setGrade(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://127.0.0.1:5555/add_student", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name: studentFirstName, last_name: studentLastName, grade: grade }),
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => console.log(data))
            }
            else {
                setError(true)
            }
        })
        setStudentFirstName("")
        setStudentLastName("")
        setGrade("default")
        alert("Student successfully added!")
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name: </label>
                    <div>
                        <input type="text" placeholder="Enter first name" id="first-name" value={studentFirstName} onChange={handleFirstName}/>
                    </div>
                    <label htmlFor="last-name">Last Name: </label>
                    <div>
                        <input type="text" placeholder="Enter last name" id="last-name" value={studentLastName} onChange={handleLastName}/>
                    </div>
                    <label htmlFor="grade">Grade: </label>
                    <div>
                        <select type="dropdown" id="grade" value={grade} onChange={handleGrade}>
                            <option value="default">Select One</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
        </form>
    )
}

export default AddStudent