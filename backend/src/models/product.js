import mongoose from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const enumProductType = {
  NORMAL: "NormalProduct",
  PROMOTION: "PromotionProduct",
};

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
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
    stock: [
      {
        color: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    type: {
      type: String,
      required: true,
      enum: Object.keys(enumProductType),
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.set("discriminatorKey", "type");

const NormalProductSchema = new Schema({});

const PromotionProductSchema = new Schema({
  percent: {
    type: Number,
    required: true,
  },
});

const discriminatorOptions = {
  inputType: {
    removeFields: ["timestamp"],
  },
};

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
  ...discriminatorOptions,
});
export const PromotionProductTC = ProductTC.discriminator(
  PromotionProductModel,
  {
    name: enumProductType.PROMOTION,
    ...discriminatorOptions,
  }
);
