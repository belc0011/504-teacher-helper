import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom'

function Comments() {
    const location = useLocation()
    const [studentInfo, setStudentInfo] = useState({})

    const url = location.pathname
    const id = url.slice(-1) //holds student id
    useEffect(() => {
        console.log(id)
        fetch(`http://127.0.0.1:5555/students/${id}`, {
            method: "GET",
            credentials: 'include'
            })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } 
            else {
                throw new Error('Error fetching student data');
            }
        })
        .then((data) => {
            console.log(data)
            setStudentInfo(data)
            })
        .catch((error) => {
            console.error(error);
        });
    }, [])
    return (<div></div>)
}

export default Comments