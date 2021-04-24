import { schemaComposer } from "graphql-compose";

import {
  UserTC,
  OrderTC,
  CartSchema,
  ProductTC,
  CustomerUserTC,
  ProductModel,
  PromotionProductModel,
} from "../../models";

CustomerUserTC.addRelation("orders", {
  resolver: () => OrderTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ userId: source._id }),
  },
  projection: { _id: true },
});

CustomerUserTC.getFieldOTC("cart").addRelation("product", {
  resolver: () =>
    schemaComposer.createResolver({
      name: "getProductInCart",
      args: {
        _id: "MongoID!",
      },
      type: schemaComposer.createObjectTC({
        name: "getProductInCartPayload",
        fields: {
          title: "String!",
          price: "Float!",
          images: "[String!]!",
          type: "String!",
          percent: "Float!",
          priceAfterPromotion: "Float!",
        },
      }),
      resolve: async ({ args }) => {
        const { _id } = args;

        const product = await ProductModel.findById(_id);

        let priceAfterPromotion = product.price;
        let percent;

        if (product.type === "PromotionProduct") {
          const promotionProduct = await PromotionProductModel.findById(_id);

          percent = promotionProduct.percent;

          priceAfterPromotion -= priceAfterPromotion * (percent / 100);
        }

        return {
          title: product.title,
          price: product.price,
          images: product.images,
          type: product.type,
          percent: percent || 0,
          priceAfterPromotion: priceAfterPromotion,
        };
      },
    }),
  prepareArgs: {
    _id: (source) => source.productId,
  },
  projection: { productId: true },
});

// CustomerUserTC.getFieldOTC("cart").addRelation("normalProduct", {
//   resolver: () => NormalProductTC.getResolver("findById"),
//   prepareArgs: {
//     _id: (source) => source.productId,
//   },
//   projection: { productId: true },
// });

// CustomerUserTC.getFieldOTC("cart").addRelation("promotionProduct", {
//   resolver: () => PromotionProductTC.getResolver("findById"),
//   prepareArgs: {
//     _id: (source) => source.productId,
//   },
//   projection: { productId: true },
// });
