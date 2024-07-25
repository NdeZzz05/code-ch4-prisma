const prisma = require("../config/prisma");

const ACCOUNT_MODELS = {
  getAllAccounts: async () => {
    try {
      const result = await prisma.bank_Accounts
        .findMany
        //     {
        //     include: {
        //       user: true,
        //       transactions_source: true,
        //       transactions_target: true,
        //     },
        //   }
        ();
      return result;
    } catch (error) {
      throw new Error("Failed to fetch accounts");
    }
  },

  createAccount: async (data) => {
    const { bank_name, bank_account_number, balance, user_id } = data;

    console.log(bank_name, bank_account_number, balance, user_id);
    try {
      const result = await prisma.bank_Accounts.create({
        data: {
          bank_name,
          bank_account_number,
          balance,
          user_id,
        },
      });
      return result;
    } catch (error) {
      throw new Error("Failed to create account");
    }
  },
};

module.exports = ACCOUNT_MODELS;
