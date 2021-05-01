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
  CartModel,
} from "../../models";

CustomerUserTC.addFields({
  cart: {
    type: CartTC.getType(),
    resolve: async (source) => {
      const { _id } = source;

      const cart = await CartModel.findOne({ userId: _id });

      const products = cart.products;

      const updatedProducts = [];

      for (let product of products) {
        const prod = await ProductModel.exists({ _id: product.productId });

        if (prod) {
          updatedProducts.push(product);
        }
      }
      cart.products = updatedProducts;

      await cart.save();

      return cart;
    },
  },
});

CustomerUserTC.addRelation("orders", {
  resolver: () => OrderTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ userId: source._id }),
  },
  projection: { _id: true },
});
