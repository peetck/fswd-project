import mongoose from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const DKey = 'type';
const enumProductType = {
  DISCOUNT: 'Discount'
}

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
  promotion: {
    type: Object.keys(enumProductType)
  }
});

// discount product price
const DiscountProductSchema = new Schema({
  discount: {type: Number, require: true},
  description: {type: String, require: true}
})

ProductSchema.set('discriminatorKey', DKey);

const discriminatorOptions = {
  inputType: {
    removeFields: ['timestamp']
  }
}

export const ProductModel = mongoose.model("Product", ProductSchema);
export const DiscountProductModel = ProductModel.discriminator(enumProductType.DISCOUNT, DiscountProductSchema);

export const ProductTC = composeWithMongooseDiscriminators(ProductModel);
export const DiscountProductTC = ProductTC.discriminator(DiscountProductModel, {name: enumProductType.DISCOUNT, ...discriminatorOptions});
