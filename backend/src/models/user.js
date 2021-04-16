import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const DKey = "type";

const enumUserType = {
  CUSTOMER: "CustomerUser",
  ADMIN: "AdminUser",
};

const CartSchema = new Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  cart: [CartSchema],
  type: {
    type: String,
    required: true,
    enum: Object.keys(enumUserType),
  },
});

UserSchema.plugin(bcrypt);
UserSchema.set("discriminatorKey", DKey);

const CustomerUserSchema = new Schema({});

const AdminUserSchema = new Schema({});

const discriminatorOptions = {
  inputType: {
    removeFields: ["cart"],
  },
};

export const UserModel = mongoose.model("User", UserSchema);
export const CustomerUserModel = UserModel.discriminator(
  enumUserType.CUSTOMER,
  CustomerUserSchema
);
export const AdminUserModel = UserModel.discriminator(
  enumUserType.ADMIN,
  AdminUserSchema
);

export const UserTC = composeWithMongooseDiscriminators(UserModel).removeField(
  "password"
);
export const CustomerUserTC = UserTC.discriminator(CustomerUserModel, {
  name: enumUserType.CUSTOMER,
  ...discriminatorOptions,
});
export const AdminUserTC = UserTC.discriminator(AdminUserModel, {
  name: enumUserType.ADMIN,
  ...discriminatorOptions,
});
