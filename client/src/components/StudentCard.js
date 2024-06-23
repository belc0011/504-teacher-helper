import React from 'react'
import { useHistory } from 'react-router-dom'

function StudentCard({firstName, lastName, grade, accommodations, id}) {
    const history = useHistory()
    function handleClick(e) {
        history.push(`edit_student/${id}`)
    }
    return (
        <div className="card">
            <a href={`/students/${id}`}>{firstName} {lastName}</a>
            <h3>Grade {grade}</h3>
               <p> Accommodations: </p>
                {accommodations && accommodations.length > 0 ? (
                    accommodations.map(accommodation => (
                        <div>
                        <a href={`/comments/${id}/${accommodation.id}`} key={accommodation.id}>{accommodation.description}</a>
                        </div>
                    ))
                ) : (
                    <div>No Accommodations</div>
                )}
            <button onClick={handleClick}>Click to edit student info</button>
        </div>
    )
}

export default StudentCard