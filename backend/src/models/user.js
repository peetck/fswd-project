import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { CartModel } from "./cart";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const DKey = "type";

const enumUserType = {
  CUSTOMER: "CustomerUser",
  ADMIN: "AdminUser",
};

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
  type: {
    type: String,
    required: true,
    enum: Object.keys(enumUserType),
  },
});

UserSchema.plugin(bcrypt);
UserSchema.set("discriminatorKey", DKey);

const CustomerUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: {
    type: [String],
    required: true,
  },
  gender: {
    type: String,
    enum: {
      MALE: "Male",
      FEMALE: "Female",
      OTHER: "Other",
    },
  },
  avatar: {
    type: String,
  },
});

CustomerUserSchema.pre("save", async function (next) {
  const cart = new CartModel({ userId: this._id, products: [] });
  await cart.save();
  next();
});

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
