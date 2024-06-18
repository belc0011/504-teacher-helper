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
    fetch("http://127.0.0.1:5555/check_session").then((r) => {
      if (r.ok) {
        (r => r.json())
        .then((user) => setUser(user));
      }
    });
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
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
