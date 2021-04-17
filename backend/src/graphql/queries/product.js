import { ProductTC, NormalProductTC, PromotionProductTC } from "../../models";

export const normalProducts = NormalProductTC.getResolver("pagination");
export const productById = ProductTC.getResolver("findById");
export const promotionProducts = PromotionProductTC.getResolver("findMany");
