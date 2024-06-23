import React from 'react'
import { NavLink, Link, useHistory } from "react-router-dom";
function NavBar({ user, setUser }) {
    const history = useHistory()

    function handleLogoutClick() {
        fetch('/logout', {
            method: 'DELETE'})
        .then(res => {
            if (res.ok) {
                setUser(null);
                history.push('/')
            }
        })
    }
    if (user) {
    return (
        <nav>
            <div>
                <Link to="/" className="nav-link">Home</Link>
            </div>
            <div>
                <Link to="/login" className="nav-link" onClick={handleLogoutClick}>Logout</Link>
            </div>
            <div>
                <Link to="/students" className="nav-link">Student List</Link>
            </div>
            <div>
                <Link to="/accommodations" className="nav-link">Accommodation Search</Link>
            </div>
        </nav>
    );
  }
}

  export default NavBar