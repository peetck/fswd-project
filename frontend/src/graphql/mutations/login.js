import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(record: {username: $username, password: $password }) {
      token
    }
  }
`;
