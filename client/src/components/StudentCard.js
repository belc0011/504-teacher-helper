import React from 'react'

function StudentCard({firstName, lastName, grade, accommodations}) {
    console.log("First name: " + firstName + "Last name: " + lastName + "Grade")
    return (
        <div>
            <h2>{firstName} {lastName}</h2>
            <h3>Grade {grade}</h3>
            <ul>Accommodations: 
                {(accommodations) ? accommodations.map(accommodation => {
                    return <li key={accommodation}>{accommodation}</li>
                }) : <div>No Accommodations</div>}
            </ul>
        </div>
    )
}

export default StudentCard