import { UserInputError } from "apollo-server-express";
import { schemaComposer } from "graphql-compose";
import jsonwebtoken from "jsonwebtoken";

import { UserTC, UserModel } from "../../models";
import { createOrder, removeOrder } from "./order";

const makePaymentInput = schemaComposer.createInputTC({
  name: "makePaymentInput",
  fields: {
    token: "String!",
    amount: "Float!",
    email: "String!",
    userId: "MongoID!",
    deliveryAddress: "String!",
  },
});

const makePaymentPayload = schemaComposer.createObjectTC({
  name: "makePaymentPayload",
  fields: {
    status: "String!",
  },
});

export const makePayment = schemaComposer.createResolver({
  name: "makePayment",
  args: {
    record: makePaymentInput,
  },
  type: makePaymentPayload,
  resolve: async ({ args, context }) => {
    const { record } = args;

    const paymentMethod = "CreditCard";

    const { amount, token, email, userId, deliveryAddress } = record;

    const { omise, user } = context;

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const orderId = await createOrder.resolve({
      args: {
        record: {
          userId: userId,
          deliveryAddress: deliveryAddress,
          paymentMethod: paymentMethod,
        },
      },
      context: context,
    });

    const customer = await omise.customers.create({
      email: email,
      card: token,
    });
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id,
    });

    if (charge.status !== "successful") {
      await removeOrder.resolve({
        args: {
          _id: orderId,
        },
        context: context,
      });
    }

    return {
      status: charge.status,
    };
  },
});
