const { hasPermission } = require("../utils");
// if the query is the same in prisma as in yoga, you can forward the query from yoga to prisma
// prisma binding gives us the ability to query our database

const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is a current user id
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    // check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // if they have permissions, query all the users
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
