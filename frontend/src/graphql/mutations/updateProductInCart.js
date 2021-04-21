import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_IN_CART_MUTATION = gql`
  mutation(
    $userId: MongoID!
    $productId: MongoID!
    $quantity: Int!
    $replace: Boolean
    $color: String!
    $size: Float!
  ) {
    updateProductInCart(
      record: {
        userId: $userId
        productId: $productId
        quantity: $quantity
        replace: $replace
        color: $color
        size: $size
      }
    ) {
      cart {
        productId
        quantity
      }
    }
  }
`;
