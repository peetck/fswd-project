import { ProductTC, PromotionProductTC } from "../../models";

ProductTC.addFields({
  totalStock: {
    type: "Int",
    resolve: (source) => {
      const { stock } = source;
      const quantity = stock.reduce(
        (prev, current) => prev + current.quantity,
        0
      );
      return quantity;
    },
    projection: { stock: true },
  },
});

PromotionProductTC.addFields({
  priceAfterDiscount: {
    type: "Float",
    resolve: (source) => {
      const { price, percent } = source;
      return price - (price * percent) / 100;
    },
    projection: { percent: true, price: true },
  },
});
