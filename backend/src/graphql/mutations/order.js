import { schemaComposer } from "graphql-compose";

import {
  OrderTC,
  CustomerUserModel,
  OrderModel,
  ProductModel,
  PromotionProductModel,
} from "../../models";

// export const createOrder = OrderTC.getResolver("createOne").wrapResolve(
//   (next) => (req) => {
//     console.log(req);
//     return next(req);
//   }
// );

const CreateOrderInput = schemaComposer.createInputTC({
  name: "CreateOrderInput",
  fields: {
    userId: "MongoID!",
    deliveryAddress: "String!",
  },
});

const CreateOrderPayload = schemaComposer.createObjectTC({
  name: "CreateOrderPayload",
  fields: {
    success: "Boolean!",
  },
});

export const createOrder = schemaComposer.createResolver({
  name: "createOrder",
  args: {
    record: CreateOrderInput,
  },
  type: CreateOrderPayload,
  resolve: async ({ args }) => {
    const { record } = args;

    const { userId, deliveryAddress } = record;

    const user = await CustomerUserModel.findById(userId);

    if (!user) {
      throw new UserInputError(`UserId ${userId} not found`);
    }

    const products = [];
    const cart = [...user.cart];

    if (cart.length === 0) {
      throw new Error("cart is empty.");
    }

    let totalPrice = 0;

    for (let cartItem of cart) {
      const product = await ProductModel.findById(cartItem.productId);
      let price = product.price;

      if (product.type === "PromotionProduct") {
        const promotionProduct = await PromotionProductModel.findById(
          cartItem.productId
        );
        price *= promotionProduct.percent / 100;
      }

      totalPrice += price * cartItem.quantity;

      const stock = [...product.stock];

      for (let i in stock) {
        if (
          stock[i].color === cartItem.color &&
          stock[i].size === cartItem.size
        ) {
          stock[i].quantity -= cartItem.quantity;
          break;
        }
      }

      product.stock = stock;

      await product.save();

      products.push({
        product: {
          title: product.title,
          type: product.type,
          price: price,
          color: cartItem.color,
          size: cartItem.size,
        },
        quantity: cartItem.quantity,
      });
    }

    const order = new OrderModel({
      userId,
      status: false,
      deliveryAddress,
      totalPrice: totalPrice,
      products: products,
    });

    await order.save();

    user.cart = [];
    await user.save();

    return {
      success: true,
    };
  },
});
