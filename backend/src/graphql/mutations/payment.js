import { UserInputError } from "apollo-server-express";
import { schemaComposer } from "graphql-compose";
import jsonwebtoken from "jsonwebtoken";

import { UserTC, UserModel } from "../../models";

const makePaymentInput = schemaComposer.createInputTC({
  name: "makePaymentInput",
  fields: {
    token: "String!",
    amount: "Float!",
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

    const { amount, token } = record;

    const { omise } = context;

    const customer = await omise.customers.create({
      email: "test@test.com",
      description: "Test Test (id: 30)",
      card: token,
    });
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id,
    });

    return {
      status: charge.status,
    };
  },
});
