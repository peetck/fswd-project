import fs from "fs";
import path from "path";
import { schemaComposer } from "graphql-compose";
import { v4 as uuidv4 } from "uuid";

const UploadFilesInput = schemaComposer.createInputTC({
  name: "UploadFilesInput",
  fields: {
    files: "[Upload!]!",
  },
});

const UploadFilesPayload = schemaComposer.createObjectTC({
  name: "UploadFilesPayload",
  fields: {
    urls: "[String!]!",
  },
});

export const uploadFiles = schemaComposer.createResolver({
  name: "uploadFiles",
  args: {
    record: UploadFilesInput,
  },
  type: UploadFilesPayload,
  resolve: async ({ args, context }) => {
    const { files } = args.record;

    const { serverUrl } = context;

    const urls = [];

    for (let file of files) {
      const fileData = await file;
      const stream = fileData.createReadStream();
      const fileName = `${uuidv4()}-${fileData.filename}`;
      await stream.pipe(
        fs.createWriteStream(path.join(process.cwd(), `/images/${fileName}`))
      );
      urls.push(serverUrl + `/images/${fileName}`);
    }

    return {
      urls,
    };
  },
});
