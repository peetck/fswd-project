import { schemaComposer } from "graphql-compose";

import {
  OrderTC,
  CustomerUserModel,
  OrderModel,
  ProductModel,
  PromotionProductModel,
  CartModel,
} from "../../models";

export const updateOrder = OrderTC.getResolver("updateById");

export const createOrder = OrderTC.getResolver("createOne").wrapResolve(
  (next) => async (req) => {
    if (!req?.context?.user) {
      throw new Error("Unauthorized. order");
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
          if (stock[i].quantity - cartProduct.quantity < 0) {
            throw new Error("Something went wrong");
          }
          stock[i].quantity -= cartProduct.quantity;
          product.sold = product.sold + cartProduct.quantity;
          break;
        }
      }

      product.stock = stock;

      products.push({
        product: product,
        color: cartProduct.color,
        size: cartProduct.size,
        quantity: cartProduct.quantity,
      });
    }

    const deliveryAddress = req?.args?.record?.deliveryAddress;
    const paymentMethod = req?.args?.record?.paymentMethod;

    const validatedProducts = [];

    for (let obj of products) {
      const { product, color, size, quantity } = obj;

      const price = product.price;

      if (product.type === "PromotionProduct") {
        const promotionProduct = await PromotionProductModel.findById(
          product._id
        );
        const percent = promotionProduct.percent;
        const priceAfterDiscount = price * (promotionProduct.percent / 100);

        validatedProducts.push({
          title: product.title,
          type: product.type,
          price: price,
          priceAfterDiscount: priceAfterDiscount,
          percent: percent,
          color: color,
          size: size,
          quantity: quantity,
          imageUrl: product.images[0],
        });
      } else {
        validatedProducts.push({
          title: product.title,
          type: product.type,
          price: price,
          color: color,
          size: size,
          quantity: quantity,
          imageUrl: product.images[0],
        });
      }

      await product.save();
    }

    cart.products = [];

    await cart.save();

    return next({
      ...req,
      args: {
        record: {
          userId: userId,
          products: validatedProducts,
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
