import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { enumProductType } from "./product";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

export const ProductInOrderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    percent: {
      type: Number,
    },
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
    type: {
      type: String,
      required: true,
      enum: Object.values(enumProductType),
    },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    products: [
      {
        type: ProductInOrderSchema,
        required: true,
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["CreditCard", "CashOnDelivery"],
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel);
