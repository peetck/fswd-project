import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation(
    $username: String!
    $password: String!
    $email: String!
    $addresses: [String!]!
    $gender: EnumCustomerUserGender!
  ) {
    createCustomerUser(
      record: {
        username: $username
        password: $password
        email: $email
        addresses: $addresses
        gender: $gender
      }
    ) {
      recordId
    }
  }
`;
