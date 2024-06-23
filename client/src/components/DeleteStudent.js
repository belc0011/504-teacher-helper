import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory, useLocation } from 'react-router-dom'

function DeleteStudent() {
    const location = useLocation()
    const url = location.pathname
    const parts = url.split("/")
    const id = parts[2]
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
          id: id
        },
        onSubmit: (values) => {
        fetch(`http://127.0.0.1:5555/students/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        history.push('/students')})
        alert("Student successfully deleted!")
        }
    })
    return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <h1>Click the button below to delete the entire student record</h1>
            <h2>Warning: This action can not be undone!</h2>
            <button type='submit'>Click to delete student</button>
        </form>
    </div>
)
}

export default DeleteStudent