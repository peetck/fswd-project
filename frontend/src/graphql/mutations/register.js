import {gql} from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    createCustomerUser(record: { username: $username, password: $password }) {
      record {
        _id
      }
      recordId
    }
  }
`;