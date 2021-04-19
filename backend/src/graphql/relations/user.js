import {
  UserTC,
  OrderTC,
  CartSchema,
  ProductTC,
  CustomerUserTC,
} from "../../models";

UserTC.addRelation("orders", {
  resolver: () => OrderTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ userId: source._id }),
  },
  projection: { _id: true },
});

CustomerUserTC.getFieldOTC("cart").addRelation("product", {
  resolver: () => ProductTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.productId,
  },
  projection: { productId: true },
});
