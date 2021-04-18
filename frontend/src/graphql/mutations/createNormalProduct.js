import { gql } from "@apollo/client";

export const CREATE_NORMAL_PRODUCT_MUTATION = gql`
  mutation(
    $title: String!
    $description: String!
    $price: Float!
    $images: [String!]!
    $quantity: Float!
  ) {
    createNormalProduct(
      record: {
        title: $title
        description: $description
        price: $price
        images: $images
        quantity: $quantity
      }
    ) {
      recordId
    }
  }
`;
