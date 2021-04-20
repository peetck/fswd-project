import { OrderTC } from "../../models";

export const orders = OrderTC.getResolver("findMany");
export const order = OrderTC.getResolver("findById");
