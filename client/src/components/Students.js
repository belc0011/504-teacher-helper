import React from 'react'
import { useState, useEffect } from "react";
import StudentCard from './StudentCard.js'
import AddStudent from './AddStudent.js'
function Students({ students, setStudents, setError }) {
    const [showAddStudent, setShowAddStudent] = useState(false)
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/students`, {
        method: "GET",
        credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setStudents(data))
            }
            else {
                //setError(true)
            }
        })
        .catch(error => {
            console.error("Error parsing JSON:", error); // Log JSON parsing errors
            //setError(true)
        })
    }, [setError, setStudents])
    
    function handleClick(e) {
        setShowAddStudent(prevState => !prevState)
    }
    return (
        <div>
            <button onClick={handleClick}>Click here to add a new student</button>
            <main>
                <h1>Students</h1>
                <div>
                    {students.map(student => {
                        return (
                            <StudentCard
                            key={student.id}
                            id={student.id}
                            firstName={student.first_name}
                            lastName={student.last_name}
                            grade={student.grade}
                            accommodations={student.accommodations}
                            />
                        )
                    })}
                </div>
            </main>
            {showAddStudent && <AddStudent setError={setError} />}
        </div>
    )
}

export default Students