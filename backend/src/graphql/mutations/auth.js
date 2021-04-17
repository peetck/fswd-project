import { UserInputError } from "apollo-server-express";
import { schemaComposer } from "graphql-compose";
import jsonwebtoken from "jsonwebtoken";

import { CustomerUserTC, CustomerUserModel } from "../../models";

const LoginInput = schemaComposer.createInputTC({
  name: "LoginInput",
  fields: {
    username: "String!",
    password: "String!",
  },
});

const LoginPayload = schemaComposer.createObjectTC({
  name: "LoginPayload",
  fields: {
    token: "String",
    user: CustomerUserTC.getType(),
  },
});

export const login = schemaComposer.createResolver({
  name: "login",
  args: {
    record: LoginInput,
  },
  type: LoginPayload,
  resolve: async ({ args }) => {
    const { record } = args;

    const { username, password } = record;

    const user = await CustomerUserModel.findOne({ username: username });

    if (!user) {
      throw new UserInputError(`Username ${username} not found`);
    }

    const valid = await user.verifyPassword(password);

    if (!valid) {
      throw new UserInputError("Incorrect password");
    }

    return {
      user: user,
      token: jsonwebtoken.sign(
        {
          _id: user._id,
          username: user.username,
        },
        process.env.SECRET ?? "RAIN_DROP_FALLING_ON_MY_HEAD",
        {
          expiresIn: "1d",
          algorithm: "HS256",
        }
      ),
    };
  },
});
