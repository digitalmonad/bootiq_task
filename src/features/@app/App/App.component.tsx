import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "../layout/NavBar";

import LeaderboardPage from "../../../pages/Leaderboard";
import SignupPage from "../../../pages/Signup";
import GamePage from "../../../pages/Game";
import NotFoundPage from "../../../pages/NotFound";

import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' component={LeaderboardPage} exact />
          <Route path='/signup' component={SignupPage} />
          <Route
            path='/game'
            // @ts-ignore
            component={() =>
              window.sessionStorage.getItem("token") ? (
                <GamePage />
              ) : (
                "You have to log in to play the game."
              )
            }
          />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
