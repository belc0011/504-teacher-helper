import React, { useState } from "react";

function Home() {
    const [accommodation, setAccommodation] = useState("")

    function handleAccommodation(e) {
        setAccommodation(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }
    return (
        <div>
            <main>
                <h1>Add a New Contact</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Search by student name: </h3>
                    <input type='text'></input>
                    <h3>Search by accommodation: </h3>
                    <label htmlFor="group">Group</label>
                    <div>
                        <select type="dropdown" id="accommodation" value={accommodation} onChange={handleAccommodation}>
                            <option value="default">Select One</option>
                            <option value="preferential-seating">Preferential Seating</option>
                            <option value="guided-notes">Guided Notes</option>
                            <option value="extra-time">Extra Time</option>
                            <option value="small-group-testing">Small Group Testing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Home