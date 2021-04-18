import { gql } from "@apollo/client";

export const PROMOTION_PRODUCTS_QUERY = gql`
  query {
    promotionProducts {
      _id
      title
      description
      price
      images
      quantity
      percent
    }
  }
`;
