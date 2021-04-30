import { schemaComposer } from "graphql-compose";

import {
  OrderTC,
  CustomerUserModel,
  OrderModel,
  ProductModel,
  PromotionProductModel,
  CartModel,
} from "../../models";

export const createOrder = OrderTC.getResolver("createOne").wrapResolve(
  (next) => async (req) => {
    if (!req?.context?.user) {
      throw new Error("Unauthorized.");
    }

    const userId = req?.args?.record?.userId;

    const cart = await CartModel.findOne({ userId: userId });

    if (cart.products.length === 0) {
      throw new Error("Cart is empty.");
    }

    const products = [];

    for (let cartProduct of cart.products) {
      const product = await ProductModel.findById(cartProduct.productId);

      const stock = [...product.stock];

      for (let i in stock) {
        if (
          stock[i].color === cartProduct.color &&
          stock[i].size === cartProduct.size
        ) {
          stock[i].quantity -= cartProduct.quantity;
          break;
        }
      }

      product.stock = stock;

      await product.save();

      const price = product.price;

      if (product.type === "PromotionProduct") {
        const promotionProduct = await PromotionProductModel.findById(
          cartProduct.productId
        );
        const percent = promotionProduct.percent;
        const priceAfterDiscount = price * (promotionProduct.percent / 100);

        products.push({
          title: product.title,
          type: product.type,
          price: price,
          priceAfterDiscount: priceAfterDiscount,
          percent: percent,
          color: cartProduct.color,
          size: cartProduct.size,
          quantity: cartProduct.quantity,
        });
      } else {
        products.push({
          title: product.title,
          type: product.type,
          price: price,
          color: cartProduct.color,
          size: cartProduct.size,
          quantity: cartProduct.quantity,
        });
      }
    }

    const deliveryAddress = req?.args?.record?.deliveryAddress;
    const paymentMethod = req?.args?.record?.paymentMethod;

    cart.products = [];

    await cart.save();

    return next({
      ...req,
      args: {
        record: {
          userId: userId,
          products: products,
          deliveryAddress: deliveryAddress,
          paymentMethod: paymentMethod,
        },
      },
    });
  }
);

export const removeOrder = OrderTC.getResolver("removeById").wrapResolve(
  (next) => async (req) => {
    const orderId = req?.args?._id;

    const order = await OrderModel.findById(orderId);

    const productsInOrder = order.products;

    for (let productInOrder of productsInOrder) {
      const product = await ProductModel.findOne({
        title: productInOrder.title,
      });

      const stock = [...product.stock];

      const index = stock.findIndex(
        (st) =>
          st.color === productInOrder.color && st.size === productInOrder.size
      );

      if (index >= 0) {
        stock[index] = {
          color: stock[index].color,
          size: stock[index].size,
          quantity: stock[index].quantity + productInOrder.quantity,
        };
      } else {
        stock[index] = {
          color: stock[index].color,
          size: stock[index].size,
          quantity: productInOrder.quantity,
        };
      }

      product.stock = stock;

      await product.save();
    }

    return next(req);
  }
);
