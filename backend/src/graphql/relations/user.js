import { schemaComposer } from "graphql-compose";

import {
  UserTC,
  OrderTC,
  CartSchema,
  ProductTC,
  CustomerUserTC,
  ProductModel,
  PromotionProductModel,
  CartTC,
} from "../../models";

CustomerUserTC.addRelation("cart", {
  resolver: () => CartTC.getResolver("findOne"),
  prepareArgs: {
    filter: (source) => ({ userId: source._id }),
  },
  projection: { _id: true },
});

CustomerUserTC.addRelation("orders", {
  resolver: () => OrderTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ userId: source._id }),
  },
  projection: { _id: true },
});
