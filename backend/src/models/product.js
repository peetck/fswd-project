import mongoose from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const enumProductType = {
  NORMAL: "NormalProduct",
  PROMOTION: "PromotionProduct",
};

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

ProductSchema.set("discriminatorKey", "type");

const NormalProductSchema = new Schema({});

const PromotionProductSchema = new Schema({
  percent: {
    type: Number,
    required: true,
  },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
export const NormalProductModel = ProductModel.discriminator(
  enumProductType.NORMAL,
  NormalProductSchema
);
export const PromotionProductModel = ProductModel.discriminator(
  enumProductType.PROMOTION,
  PromotionProductSchema
);

export const ProductTC = composeWithMongooseDiscriminators(ProductModel);
export const NormalProductTC = ProductTC.discriminator(NormalProductModel, {
  name: enumProductType.NORMAL,
});
export const PromotionProductTC = ProductTC.discriminator(
  PromotionProductModel,
  {
    name: enumProductType.PROMOTION,
  }
);
