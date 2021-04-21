import { gql } from "@apollo/client";

export const PRODUCT_BY_TITLE_QUERY = gql`
  query($title: String!) {
    productByTitle(filter: { title: $title }) {
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
      quantity
      createdAt
      type
    }
  }
`;
