import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const Mixed = Schema.Types.Mixed;

const OrderSchema = new Schema(
  {
    products: [
      {
        product: { type: Mixed, required: true },
        quantity: { type: Number, required: true },
      },
    ],
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

OrderSchema.pre("save", (next) => {
  // หักจาก stock
  next();
});

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel);
