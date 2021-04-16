import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel);
