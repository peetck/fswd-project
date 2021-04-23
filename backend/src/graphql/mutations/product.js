import { schemaComposer } from "graphql-compose";

import {
  NormalProductTC,
  ProductModel,
  NormalProductModel,
  PromotionProductModel,
} from "../../models";

export const createNormalProduct = NormalProductTC.getResolver(
  "createOne"
).wrapResolve((next) => (req) => {
  if (req?.context?.user?.type !== "AdminUser") {
    throw new Error("Not allowed");
  }
  return next(req);
});

export const updateNormalProduct = NormalProductTC.getResolver("updateById");

const CreatePromotionProductInput = schemaComposer.createInputTC({
  name: "CreatePromotionProductInput",
  fields: {
    _id: "MongoID!",
    percent: "Float!",
  },
});

const CreatePromotionProductPayload = schemaComposer.createObjectTC({
  name: "CreatePromotionProductPayload",
  fields: {
    _id: "MongoID!",
    percent: "Float!",
  },
});

export const createPromotionProduct = schemaComposer.createResolver({
  name: "createPromotionProduct",
  args: {
    record: CreatePromotionProductInput,
  },
  type: CreatePromotionProductPayload,
  resolve: async ({ args }) => {
    const { record } = args;

    const { _id, percent } = record;

    const product = await ProductModel.findById(_id);

    const promotionProduct = PromotionProductModel.hydrate(product.toObject());

    promotionProduct.type = "PromotionProduct";
    promotionProduct.percent = percent;

    await promotionProduct.save();

    return {
      _id,
      percent,
    };
  },
});
