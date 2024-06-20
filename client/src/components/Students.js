import React from 'react'
import { useState, useEffect } from "react";
import StudentCard from './StudentCard.js'

function Students({ students, setStudents, setError }) {
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
                setError(true)
            }
        })
        .catch(error => {
            console.error("Error parsing JSON:", error); // Log JSON parsing errors
            setError(true)
        })
    }, [setError, setStudents])
    
    return (
        <div>
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
        </div>
    )
}

export default Students