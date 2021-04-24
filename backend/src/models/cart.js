import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const CartSchema = new Schema({
  products: [
    {
      productId: {
        type: ObjectId,
        required: true,
        ref: "Product",
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
    },
  ],
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

export const CartModel = mongoose.model("Cart", CartSchema);

export const CartTC = composeWithMongoose(CartModel);
