import { gql } from "@apollo/client";

export const NORMAL_PRODUCTS_PAGINATION_QUERY = gql`
  query($page: Int!, $perPage: Int!) {
    normalProductsPagination(page: $page, perPage: $perPage) {
      items {
        _id
        title
        description
        price
        images
        quantity
        createdAt
      }
      count
    }
  }
`;
