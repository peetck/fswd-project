import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

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
});

UserSchema.plugin(bcrypt);

export const UserModel = mongoose.model("User", UserSchema);

export const UserTC = composeWithMongoose(UserModel).removeField("password");
