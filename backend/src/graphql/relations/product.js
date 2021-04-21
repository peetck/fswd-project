import { ProductTC } from "../../models";

ProductTC.addFields({
  quantity: {
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
