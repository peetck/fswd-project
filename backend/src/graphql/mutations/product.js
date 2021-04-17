import fs from "fs";
import path from "path";
import { schemaComposer } from "graphql-compose";
import { v4 as uuidv4 } from "uuid";

import { NormalProductTC, NormalProductModel, ProductTC } from "../../models";

export const updateNormalProduct = NormalProductTC.getResolver("updateById");

const CreateNormalProductInput = schemaComposer.createInputTC({
  name: "CreateNormalProductInput",
  fields: {
    title: "String!",
    description: "String!",
    price: "Float!",
    images: "[Upload!]!",
    quantity: "Int!",
  },
});

const CreateNormalProductPayload = schemaComposer.createObjectTC({
  name: "CreateNormalProductPayload",
  fields: {
    title: "String!",
    description: "String!",
    price: "Float!",
    images: "[String!]!",
    quantity: "Int!",
  },
});

export const createNormalProduct = schemaComposer
  .createResolver({
    name: "createNormalProduct",
    args: {
      record: CreateNormalProductInput,
    },
    type: CreateNormalProductPayload,
    resolve: async ({ args, context }) => {
      const { record } = args;

      const { serverUrl } = context;

      const { title, description, price, images, quantity } = record;

      const product = new NormalProductModel({
        title,
        description,
        price,
        images: imagesUrl,
        quantity,
      });

      const imagesUrl = [];

      for (let image of images) {
        const data = await image;
        const stream = data.createReadStream();
        const fileName = `${uuidv4()}-${data.filename}`;
        await stream.pipe(
          fs.createWriteStream(path.join(process.cwd(), `/images/${fileName}`))
        );
        imagesUrl.push(serverUrl + `/images/${fileName}`);
      }

      await product.save();

      return product;
    },
  })
  .wrapResolve((next) => (req) => {
    if (req?.context?.user?.type !== "AdminUser") {
      throw new Error("Not allowed");
    }
    return next(req);
  });
