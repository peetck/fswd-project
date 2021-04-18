import { NormalProductTC, PromotionProductTC } from "../../models";

export const normalProducts = NormalProductTC.getResolver("findMany");
export const promotionProducts = PromotionProductTC.getResolver("findMany");
export const normalProductsPagination = NormalProductTC.getResolver(
  "pagination"
);
export const normalProduct = NormalProductTC.getResolver("findOne");
