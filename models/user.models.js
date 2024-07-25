const prisma = require("../config/prisma");

const USER_MODELS = {
  getUser: async () => {
    try {
      const result = await prisma.user.findMany();
      return result;
    } catch (error) {
      return error;
    }
  },

  getDetailUser: async (id) => {
    try {
      const result = await prisma.user.findUnique({
        where: { id },
        include: { profile: true },
      });
      return result;
    } catch (error) {
      return error;
    }
  },

  createUser: async (data) => {
    const { name, email, identity_type, identity_number, address } = data;
    try {
      const result = await prisma.user.create({
        data: {
          name,
          email,
          profile: {
            create: {
              identity_type,
              identity_number,
              address,
            },
          },
        },
        include: { profile: true },
      });
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = USER_MODELS;
