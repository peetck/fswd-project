import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import jwt from "express-jwt";

import schema from "./graphql/index.js";

const PATH = "/graphql";
const PORT = process.env.PORT ?? 5001;

const app = express();

const server = new ApolloServer({
  schema: schema,
  playground: true,
  context: ({ req }) => ({ user: req.user }),
});

app.use(
  PATH,
  jwt({
    secret: process.env.SECRET ?? "RAIN_DROP_FALLING_ON_MY_HEAD",
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: (req) => {
      if (req?.headers?.authorization?.split(" ")?.[0] === "Bearer") {
        return req?.headers?.authorization?.split(" ")?.[1];
      }
      return null;
    },
  }),
  (err, req, res, next) => {
    return res.status(401).json({
      errors: [
        {
          message: err.message,
        },
      ],
    });
  }
);

server.applyMiddleware({ app: app, path: PATH });

mongoose
  .connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${PATH}`);
    });
  });
