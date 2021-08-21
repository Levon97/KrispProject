import Home from "./conteiners/home.js";
import Registration from "./components/registration.js";
import Login from "./components/login.js";
import Profile from "./conteiners/profile.js";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


function Wrapper() {
    return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/registration">
                <Registration />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
        </Switch>
    </Router>
    )
}

export default Wrapper;