import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import NavBar from './NavBar'
import Students from './Students'
import SignUp from './SignUp'
import Home from './Home'

function App() {
  const [user, setUser] = useState(null);

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

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
    <Router>
      <NavBar user={user} setUser={setUser} />
        <main>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path="/students">
              <Students />
            </Route>
            <Route path="/logout">
              <Login />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
