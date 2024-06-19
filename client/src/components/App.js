import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import NavBar from './NavBar'
import Students from './Students'
import SignUp from './SignUp'
import Home from './Home'

function App() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("http://127.0.0.1:5555/check_session")
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
                <Home setStudents={setStudents} error={error} setError={setError} user={user}/>
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/students">
                <Students students={students} setStudents={setStudents}/>
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
