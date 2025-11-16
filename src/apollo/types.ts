import { Compte, Transaction, SoldeStats, TransactionStats } from '../graphql/interfaces';

export interface GetAllComptesData {
    allComptes: Compte[];
}

export interface GetCompteByIdData {
    compteById: Compte;
}

export interface GetTotalSoldeData {
    totalSolde: SoldeStats;
}

export interface GetCompteByTypeData {
    findCompteByType: Compte[];
}

export interface GetCompteTransactionsData {
    compteTransactions: Transaction[];
}

export interface GetAllTransactionsData {
    allTransactions: Transaction[];
}

export interface GetTransactionStatsData {
    transactionStats: TransactionStats;
}
