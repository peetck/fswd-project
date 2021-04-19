import { CustomerUserModel, CustomerUserTC, AdminUserTC } from "../../models";
import { schemaComposer } from "graphql-compose";

export const createCustomerUser = CustomerUserTC.getResolver("createOne");
export const createAdminUser = AdminUserTC.getResolver("createOne");

const UpdateProductInCartInput = schemaComposer.createInputTC({
  name: "UpdateProductInCart",
  fields: {
    userId: "MongoID!",
    productId: "MongoID!",
    quantity: "Int!",
    replace: "Boolean",
  },
});

const UpdateProductInCartPayload = schemaComposer.createObjectTC({
  name: "UpdateProductInCartPayload",
  fields: {
    cart: CustomerUserTC.getFieldType("cart"),
  },
});

export const updateProductInCart = schemaComposer.createResolver({
  name: "addToCart",
  args: {
    record: UpdateProductInCartInput,
  },
  type: UpdateProductInCartPayload,
  resolve: async ({ args }) => {
    const { record } = args;

    const { userId, productId, replace } = record;

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
      if (!replace) {
        quantity = updatedCart[index].quantity + quantity;
      }

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
