import {
  CartTC,
  ProductTC,
  ProductModel,
  CustomerUserTC,
  PromotionProductModel,
} from "../../models";

CartTC.getFieldOTC("products").addRelation("product", {
  resolver: () => ProductTC.getResolver("findOne"),
  prepareArgs: {
    filter: (source) => ({ _id: source.productId }),
  },
  projection: { productId: true },
});

CartTC.addFields({
  totalPrice: {
    type: "Float",
    resolve: async (source) => {
      const { products } = source;

      let totalPrice = 0;

      for (let i of products) {
        const prod = await ProductModel.findById(i.productId);
        if (prod.type === "PromotionProduct") {
          const promotionProd = await PromotionProductModel.findById(
            i.productId
          );
          totalPrice +=
            (prod.price - prod.price * (promotionProd.percent / 100)) *
            i.quantity;
        } else {
          totalPrice += prod.price * i.quantity;
        }
      }

      return totalPrice;
    },
  },
});
