import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import AddStudent from './AddStudent'
import Students from './Students'
import { useFormik } from "formik";
import * as yup from "yup";

function Home({ error, setError, user, students, setStudents }) {
    const [showComponent, setShowComponent] = useState(false);
    const history = useHistory()

    function handleClick(e) {
        history.push('/accommodations')
    }
    function handleSubmit(e) {
        e.preventDefault()
        setShowComponent(true)
    }
    
    function handleSubmit2(e) {
        e.preventDefault()
        history.push('/students')
        
    }

    //if (students.length === 0) {
    return (
        <div>
            <main>
                <h3>Click here to search by accommodation: </h3>
                <button onClick={handleClick}>Accommodation Search</button>
                <form onSubmit={handleSubmit2}>
                    <h3>Click here for a list of your students</h3>
                    <div>
                        <p></p>
                        <button type="submit">Student List</button>
                    </div>
                </form>
                <form onSubmit={handleSubmit}>
                <h3>Click here to add a student</h3>
                    <div>
                        <p></p>
                        <button type="submit">Add a student</button>
                    </div>
                </form>
                {showComponent && <AddStudent students={students} setStudents={setStudents} setError={setError} error={error}/>}
            </main>
        </div>
            )//} 
    /*else {
        return (
            <div>
                <Students students={students} setStudents={setStudents}/>
            </div>
        )
    }*/
}

export default Home