import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { TScore } from "./Leaderboard.types";

import LoginForm from "../../features/auth/LoginForm";

import useModal from "../../hooks/useModal";
import { HIGH_SCORES } from "./Leaderboard.queries";

const LeaderboardPage = () => {
  const { loading, error, data } = useQuery(HIGH_SCORES);
  const { show, hide, RenderModal } = useModal();

  if (error) {
    console.error(error);
  }
  return (
    <div className='App'>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <pre>
          {data.allScores.map(
            (score: TScore) => `${score.player.name} : ${score.score}\n`
          )}
        </pre>
      )}
      <RenderModal>
        <LoginForm onLoginSuccess={hide} />
      </RenderModal>

      <button onClick={show}>Login</button>
      <Link to={"/signup"}>
        <button>Register</button>
      </Link>
    </div>
  );
};

export default LeaderboardPage;
