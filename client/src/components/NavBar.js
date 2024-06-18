import React from 'react'
import { NavLink } from "react-router-dom";
function NavBar({ user, setUser }) {
    function handleLogoutClick() {
        fetch('/logout', {
            method: 'DELETE'})
        .then(res => {
            if (res.ok) {
                setUser(null)
            }

        })
    }
  
    return (
        <nav>
            <div>
                <NavLink to="/" className="nav-link">Home</NavLink>
            </div>
            <div>
                <NavLink to="/logout" className="nav-link" onClick={handleLogoutClick}>Logout</NavLink>
            </div>
        </nav>
    );
  }

  export default NavBar