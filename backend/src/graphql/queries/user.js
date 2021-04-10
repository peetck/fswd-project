import { UserTC } from "../../models";

export const userById = UserTC.getResolver("findById");
