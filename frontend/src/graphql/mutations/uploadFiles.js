import { gql } from "@apollo/client";

export const UPLOAD_FILES_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadFiles(record: { files: $files }) {
      urls
    }
  }
`;
