import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: ObjectId,
    required: true,
    ref: "Product",
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel);
