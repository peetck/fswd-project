import { OrderTC } from "../../models";

OrderTC.addFields({
  totalPrice: {
    type: "Float",
    resolve: (source) => {
      const { products } = source;
      const totalPrice = products.reduce((prev, prod) => {
        if (prod.type === "PromotionProduct") {
          return prev + prod.priceAfterDiscount * prod.quantity;
        } else {
          return prev + prod.price * prod.quantity;
        }
      }, 0);
      return totalPrice;
    },
  },
});
