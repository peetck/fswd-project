import { gql } from "@apollo/client";

export const PRODUCT_BY_ID_QUERY = gql`
  query($_id: MongoID!) {
    productById(_id: $_id) {
      title
      description
      price
      images
      quantity
    }
  }
`;
