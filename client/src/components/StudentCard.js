import React from 'react'

function StudentCard({firstName, lastName, grade, accommodations, id}) {
    console.log("First name: " + firstName + "Last name: " + lastName + "Grade" + grade + "ID:" + id)
    return (
        <div className="card">
            <a href={`/students/${id}`}>{firstName} {lastName}</a>
            <h3>Grade {grade}</h3>
            <ul>
                Accommodations: 
                {accommodations && accommodations.length > 0 ? (
                    accommodations.map(accommodation => (
                        <li key={accommodation.id}>{accommodation.description}</li>
                    ))
                ) : (
                    <div>No Accommodations</div>
                )}
            </ul>
        </div>
    )
}

export default StudentCard