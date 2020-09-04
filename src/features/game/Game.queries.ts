import { gql } from "@apollo/client";

export const NEW_GAME = gql`
  query NewGame {
    newGame {
      score
      state
      finished
    }
  }
`;

export const PROCESS_GAME = gql`
  mutation ProcessGame($game: GameInput!) {
    processGame(game: $game) {
      score
      state
      finished
    }
  }
`;
