import React from 'react'
import { useState } from "react";
import StudentCard from './StudentCard.js'

function Students({ students, setStudents }) {

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