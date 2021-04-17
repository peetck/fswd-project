import { gql } from "@apollo/client";

export const CREATE_NORMAL_PRODUCT_MUTATION = gql`
  mutation(
    $title: String!
    $description: String!
    $price: Float!
    $images: [Upload!]!
    $quantity: Int!
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
      title
      description
      price
      images
      quantity
    }
  }
`;
