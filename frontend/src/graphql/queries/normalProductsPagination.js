import { gql } from "@apollo/client";

export const NORMAL_PRODUCTS_PAGINATION_QUERY = gql`
  query(
    $page: Int!
    $perPage: Int!
    $filter: FilterFindManyNormalProductInput!
  ) {
    normalProductsPagination(page: $page, perPage: $perPage, filter: $filter) {
      items {
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
        createdAt
      }
      count
    }
  }
`;
