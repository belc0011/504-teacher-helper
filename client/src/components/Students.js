import React from 'react'
import { useState } from "react";
import StudentCard from './StudentCard'

function Students() {
    const [students, setStudents] = useState([])
    fetch('http://127.0.0.1:5555')
    .then(res => res.json())
    .then(students => setStudents(students))

    return (
        <div>
            <main>
                <h1>Students</h1>
                <div>
                    {students.map(student => {
                        return (
                            <StudentCard firstName={student.firstName} lastName={student.lastName} grade={student.grade} accommodations={student.accommodations} key={student.id} />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export default Students