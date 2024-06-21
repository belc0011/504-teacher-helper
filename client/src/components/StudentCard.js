import React from 'react'

function StudentCard({firstName, lastName, grade, accommodations, id}) {
    console.log("First name: " + firstName + "Last name: " + lastName + "Grade" + grade + "ID:" + id)
    return (
        <div className="card">
            <a href={`/students/${id}`}>{firstName} {lastName}</a>
            <h3>Grade {grade}</h3>
               <p> Accommodations: </p>
                {accommodations && accommodations.length > 0 ? (
                    accommodations.map(accommodation => (
                        <div>
                        <a href={`/comments/${id}`} key={accommodation.id}>{accommodation.description}</a>
                        </div>
                    ))
                ) : (
                    <div>No Accommodations</div>
                )}
        </div>
    )
}

export default StudentCard