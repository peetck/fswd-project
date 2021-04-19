import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation(
    $products: [OrderProductsInput]
    $deliveryAddress: String!
    $userId: MongoID!
  ) {
    createOrder(
      record: {
        products: $products
        deliveryAddress: $deliveryAddress
        userId: $userId
      }
    ) {
      recordId
    }
  }
`;
