import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/comments/:id">
          <Comments />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
