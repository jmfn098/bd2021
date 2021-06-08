import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";
const Login = React.lazy(() => import("./pages/Login/Login"));
const Layout = React.lazy(() => import("./containers/Layout"));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "auth/setUser" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route path="/" name="Home" render={(props) => <Layout />} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
