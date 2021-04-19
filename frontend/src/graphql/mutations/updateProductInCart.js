import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_IN_CART_MUTATION = gql`
  mutation(
    $userId: MongoID!
    $productId: MongoID!
    $quantity: Int!
    $replace: Boolean
  ) {
    updateProductInCart(
      record: {
        userId: $userId
        productId: $productId
        quantity: $quantity
        replace: $replace
      }
    ) {
      cart {
        productId
        quantity
      }
    }
  }
`;
