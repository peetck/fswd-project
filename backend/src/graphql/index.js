import { schemaComposer } from "graphql-compose";

import "./relations";
import * as mutationFields from "./mutations";
import * as queryFields from "./queries";

schemaComposer.Mutation.addFields(mutationFields);
schemaComposer.Query.addFields(queryFields);

const GQLSchema = schemaComposer.buildSchema();

schemaComposer.Mutation.addFields;

export default GQLSchema;
