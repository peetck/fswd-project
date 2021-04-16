import { CustomerUserTC } from "../../models";
import { schemaComposer } from "graphql-compose";

import { CustomerUserModel } from "../../models";

export const createCustomerUser = CustomerUserTC.getResolver("createOne");

const UpdateCartInput = schemaComposer.createInputTC({
  name: "UpdateCartInput",
  fields: {
    userId: "String!",
    productId: "String!",
    quantity: "Int!",
  },
});

const UpdateCartPayload = schemaComposer.createObjectTC({
  name: "UpdateCartPayload",
  fields: {
    cart: CustomerUserTC.getFieldType("cart"),
  },
});

export const updateCart = schemaComposer.createResolver({
  name: "updateCart",
  args: {
    record: UpdateCartInput,
  },
  type: UpdateCartPayload,
  resolve: async ({ args }) => {
    const { record } = args;

    const { userId, productId } = record;

    let { quantity } = record;

    const user = await CustomerUserModel.findById(userId);

    if (!user) {
      throw new Error(`User ID ${userId} not found`);
    }

    const updatedCart = [...user.cart];

    const index = updatedCart.findIndex(
      (prod) => prod.productId.toString() === productId
    );

    if (index !== -1) {
      quantity = updatedCart[index].quantity + quantity;
      if (quantity > 0) {
        updatedCart[index] = {
          productId: productId,
          quantity: quantity,
        };
      } else {
        updatedCart.splice(index, 1);
      }
    } else if (quantity > 0) {
      updatedCart.push({ productId: productId, quantity: quantity });
    }

    user.cart = updatedCart;

    await user.save();

    return {
      cart: updatedCart,
    };
  },
});
