import { gql } from "@apollo/client";

export const CREATE_PROMOTION_PRODUCT_MUTATION = gql`
  mutation($_id: MongoID!, $percent: Float!) {
    createPromotionProduct(record: { _id: $_id, percent: $percent }) {
      _id
      percent
    }
  }
`;
