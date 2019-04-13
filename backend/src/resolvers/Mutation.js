const Mutations = {
  async createItem(parent, args, ctx, info) {
    // @TODO check if they are logged in
    // our mutation types can be found in the geberated prisma.graphql file
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  }
};

module.exports = Mutations;
