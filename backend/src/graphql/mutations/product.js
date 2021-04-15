import { NormalProductTC, PromotionProductTC } from "../../models";

export const createNormalProduct = NormalProductTC.getResolver("createOne");
export const createPromotionProduct = PromotionProductTC.getResolver(
  "createOne"
);
