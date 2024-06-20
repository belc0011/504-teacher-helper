import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import Login from './Login'
import NavBar from './NavBar'
import Students from './Students'
import SignUp from './SignUp'
import Home from './Home'
import StudentPage from './StudentPage'
import AccommodationSearch from './AccommodationSearch'

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false)
  const [students, setStudents] = useState([])
  const history = useHistory()

  useEffect(() => {
    // auto-login
    fetch(`http://127.0.0.1:5555/check_session`, {
      method: "GET",
      credentials: 'include'
      })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then((user) => setUser(user))
      .catch((error) => console.error('There was a problem with the fetch operation:', error));
  }, []);
  
  return (
    <Router>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <main>
            <Switch>
              <Route exact path="/">
                <Home error={error} setError={setError} user={user} students={students} setStudents={setStudents}/>
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route path="/students">
                <Students setError={setError} students={students} setStudents={setStudents}/>
              </Route>
              <Route path="/students/:id">
                <StudentPage />
              </Route>
              <Route path="/accommodations">
                <AccommodationSearch />
              </Route>
            </Switch>
          </main>
        </>
      ) : (
        <Login onLogin={setUser} error={error} setError={setError}/>
      )}
    </Router>
  );
}

export default App;
