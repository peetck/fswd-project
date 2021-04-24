import { CartTC, ProductTC, ProductModel } from "../../models";

CartTC.getFieldOTC("products").addRelation("product", {
  resolver: () => ProductTC.getResolver("findOne"),
  prepareArgs: {
    filter: (source) => ({ _id: source.productId }),
  },
  projection: { productId: true },
});
