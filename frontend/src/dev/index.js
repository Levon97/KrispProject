import Login from "./components/login";
import Registration from "./components/registration";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Home from "./conteiners/home";
import Profile from "./conteiners/profile";

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