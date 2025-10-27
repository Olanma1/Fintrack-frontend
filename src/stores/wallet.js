import { defineStore } from "pinia";
import api from "../api/axios";
import { useTransactionStore } from "./transaction";

export const useWalletStore = defineStore("wallet", {
    state: () => ({
        balance: 0,
        recent_transactions: [],
        loading: false,
        error: null,
    }),

    actions: {
    async fetchWallet() {
    this.loading = true;
    try {
        const walletRes = await api.get("/wallet");
        this.balance = Number(walletRes.data.balance || 0);

        const transactionStore = useTransactionStore();
        await transactionStore.fetchTransactions();
        this.recent_transactions = transactionStore.transactions.slice(0, 5);
    } finally {
        this.loading = false;
    }
    },
    },
});
