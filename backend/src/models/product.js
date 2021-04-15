import mongoose from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const DKey = "type";
const enumProductType = {
  NORMAL: "NormalProduct",
  PROMOTION: "PromotionProduct",
};

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  type: {
    type: String,
    required: true,
    enum: Object.keys(enumProductType),
  },
});

ProductSchema.set("discriminatorKey", DKey);

const NormalProductSchema = new Schema({});

const PromotionProductSchema = new Schema({
  discount: { type: Number, required: true },
  description: { type: String, required: true },
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
