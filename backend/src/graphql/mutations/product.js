import { schemaComposer } from "graphql-compose";

import {
  NormalProductTC,
  ProductModel,
  NormalProductModel,
  PromotionProductModel,
  PromotionProductTC,
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
export const removeNormalProduct = NormalProductTC.getResolver("removeById");

export const updatePromotionProduct = PromotionProductTC.getResolver(
  "updateById"
);

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

const RemovePromotionProductInput = schemaComposer.createInputTC({
  name: "RemovePromotionProductInput",
  fields: {
    _id: "MongoID!",
  },
});

const RemovePromotionProductPayload = schemaComposer.createObjectTC({
  name: "RemovePromotionProductPayload",
  fields: {
    status: "Boolean",
  },
});

export const removePromotionProduct = schemaComposer.createResolver({
  name: "removePromotionProduct",
  args: {
    record: RemovePromotionProductInput,
  },
  type: RemovePromotionProductPayload,
  resolve: async ({ args }) => {
    const { record } = args;

    const { _id } = record;

    const product = await ProductModel.findById(_id);

    delete product["percent"];

    const normalProduct = NormalProductModel.hydrate(product.toObject());

    normalProduct.type = "NormalProduct";

    await normalProduct.save();

    return {
      status: true,
    };
  },
});
