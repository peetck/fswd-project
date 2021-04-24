import { CustomerUserModel, CustomerUserTC, AdminUserTC } from "../../models";
import { schemaComposer } from "graphql-compose";

export const createCustomerUser = CustomerUserTC.getResolver("createOne");
export const createAdminUser = AdminUserTC.getResolver("createOne");
