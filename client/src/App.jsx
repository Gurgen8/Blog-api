import Home from "./pages/homepage/Homepage";
import TopBar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (

    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/register"> <Register /></Route>
        <Route path="/login"> {!user ? <Login /> : <Redirect path="/" />}</Route>
        <Route path="/write">{user ? <Write /> : <Redirect path="/register" />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Redirect path="/register" />}</Route>
        <Route path="/post/:postId"> {user ? <Single /> : <Redirect path="/register" />}</Route>
      </Switch>
    </Router>
  );
}

export default App;