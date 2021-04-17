import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation($username: String!, $password: String!, $address: String!) {
    createCustomerUser(
      record: { username: $username, password: $password, address: $address }
    ) {
      record {
        _id
      }
      recordId
    }
  }
`;
