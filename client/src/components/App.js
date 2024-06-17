import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Login'
import NavBar from './NavBar'
import Students from './Students'

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
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/">
            <Students />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
