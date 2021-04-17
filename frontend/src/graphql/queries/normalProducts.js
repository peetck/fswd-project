import { gql } from "@apollo/client";

export const NORMAL_PRODUCTS_QUERY = gql`
  query($page: Int, $perPage: Int) {
    normalProducts(page: $page, perPage: $perPage) {
      items {
        _id
        title
        description
        price
        images
        quantity
      }
    }
  }
`;
