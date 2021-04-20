import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

export const ProductInOrderSchema = new Schema(
  {
    product: {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
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
    totalPrice: {
      type: Number,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
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
