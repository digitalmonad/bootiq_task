import { gql } from "@apollo/client";

export const HIGH_SCORES = gql`
  query GetHighScores {
    allScores(orderBy: "score_DESC") {
      player {
        name
      }
      score
    }
  }
`;
