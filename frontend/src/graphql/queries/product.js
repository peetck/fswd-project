import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query($title: String!) {
    product(filter: { title: $title }) {
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
      ... on PromotionProduct {
        percent
        priceAfterPromotion
      }
    }
  }
`;
