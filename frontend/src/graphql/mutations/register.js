import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation(
    $username: String!
    $password: String!
    $email: String!
    $address: String!
  ) {
    createCustomerUser(
      record: {
        username: $username
        password: $password
        email: $email
        address: $address
      }
    ) {
      recordId
    }
  }
`;
