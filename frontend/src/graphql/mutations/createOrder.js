import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation($userId: MongoID!, $deliveryAddress: String!) {
    createOrder(
      record: { userId: $userId, deliveryAddress: $deliveryAddress }
    ) {
      success
    }
  }
`;
