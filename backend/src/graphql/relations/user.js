import { UserTC, OrderTC } from "../../models";

UserTC.addRelation("orders", {
  resolver: () => OrderTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ userId: source._id }),
  },
  projection: { _id: true },
});
