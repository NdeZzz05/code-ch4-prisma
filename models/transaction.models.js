const prisma = require("../config/prisma");

const TRANSACTION_MODELS = {
  getAllTransactions: async () => {
    try {
      const result = await prisma.transactions.findMany({
        include: {
          sourceAccount: true,
          destinationAccount: true,
        },
      });
      return result;
    } catch (error) {
      throw new Error("Failed to fetch transactions");
    }
  },

  createTransaction: async (data) => {
    const { amount, source_account_id, destination_account_id } = data;

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (prisma) => {
      const sourceAccount = await prisma.bank_Accounts.findUnique({
        where: { id: source_account_id },
      });

      if (!sourceAccount) {
        throw new Error("Source account not found");
      }

      if (sourceAccount.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const updatedSourceAccount = await prisma.bank_Accounts.update({
        where: { id: source_account_id },
        data: { balance: { decrement: amount } },
      });

      const updatedDestinationAccount = await prisma.bank_Accounts.update({
        where: { id: destination_account_id },
        data: { balance: { increment: amount } },
      });

      const transaction = await prisma.transactions.create({
        data: {
          amount,
          source_account_id,
          destination_account_id,
        },
      });

      return transaction;
    });

    return result;
  },

  getTransactionById: async (id) => {
    try {
      const result = await prisma.transactions.findUnique({
        where: { id },
        include: {
          sourceAccount: true,
          destinationAccount: true,
        },
      });

      if (!result) {
        throw new Error("Transaction not found");
      }

      return result;
    } catch (error) {
      throw new Error("Failed to fetch transaction");
    }
  },
  createCashDeposit: async (amount, destination_account_id) => {
    const result = await prisma.$transaction(async (prisma) => {
      const updatedDestinationAccount = await prisma.bank_Accounts.update({
        where: { id: destination_account_id },
        data: { balance: { increment: amount } },
      });

      const transaction = await prisma.transactions.create({
        data: {
          amount,
          source_account_id: null, // Tidak ada akun sumber untuk setoran tunai
          destination_account_id,
        },
      });

      return transaction;
    });

    return result;
  },
};

module.exports = TRANSACTION_MODELS;
