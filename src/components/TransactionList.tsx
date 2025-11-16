import React from "react";
import { useQuery } from '@apollo/client/react';
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";
import { Transaction } from "../graphql/interfaces";
import { GetAllTransactionsData } from "../apollo/types";
import { formatMAD } from "../utils/format";

const TransactionList: React.FC = () => {
    const { loading, error, data } = useQuery<GetAllTransactionsData>(GET_ALL_TRANSACTIONS);

    if (loading) return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Erreur : {error.message}
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Historique des Transactions</h2>
            <div className="space-y-3">
                {data?.allTransactions?.map((transaction: Transaction) => (
                    <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-600">
                                    {new Date(transaction.date).toLocaleDateString('fr-MA')}
                                </p>
                                <p className={`text-lg font-semibold ${
                                    transaction.type === 'DEPOT' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {transaction.type === 'DEPOT' ? '+' : '-'}{formatMAD(transaction.montant)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Compte: {transaction.compte.type} (ID: {transaction.compte.id})
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                transaction.type === 'DEPOT'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                {transaction.type}
              </span>
                        </div>
                    </div>
                ))}
                {(!data?.allTransactions || data.allTransactions.length === 0) && (
                    <p className="text-gray-500 text-center py-4">Aucune transaction trouvée</p>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
