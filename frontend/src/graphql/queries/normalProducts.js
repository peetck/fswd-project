import { gql } from "@apollo/client";

export const NORMAL_PRODUCTS_QUERY = gql`
  query {
    normalProducts {
      _id
      title
      description
      price
      images
      stock {
        quantity
        color
        size
      }
    }
  }
`;
