import { NormalProductTC, PromotionProductTC } from "../../models";

export const createNormalProduct = NormalProductTC.getResolver(
  "createOne"
).wrapResolve((next) => (req) => {
  if (req?.context?.user?.type !== "AdminUser") {
    throw new Error("Not allowed");
  }
  return next(req);
});
// export const createPromotionProduct = PromotionProductTC.getResolver(
//   "createOne"
// );
