import { gql } from "@apollo/client";

export const UPDATE_NORMAL_PRODUCT_MUTATION = gql`
  mutation(
    $_id: MongoID!
    $description: String
    $price: Float!
    $quantity: Float!
  ) {
    updateNormalProduct(
      _id: $_id
      record: { description: $description, price: $price, quantity: $quantity }
    ) {
      recordId
    }
  }
`;
