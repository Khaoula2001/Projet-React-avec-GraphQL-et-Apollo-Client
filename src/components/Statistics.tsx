import React from "react";
import { useQuery } from '@apollo/client/react';
import { GET_TOTAL_SOLDE, GET_TRANSACTION_STATS } from "../graphql/queries";
import { GetTotalSoldeData, GetTransactionStatsData } from "../apollo/types";

const Statistics: React.FC = () => {
    const { data: soldeData, loading: soldeLoading, error: soldeError } = useQuery<GetTotalSoldeData>(GET_TOTAL_SOLDE);
    const { data: transactionData, loading: transactionLoading, error: transactionError } = useQuery<GetTransactionStatsData>(GET_TRANSACTION_STATS);

    if (soldeLoading || transactionLoading) return (
        <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistiques</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Statistiques des soldes */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Soldes des Comptes</h3>
                    {soldeError ? (
                        <p className="text-red-600">Erreur: {soldeError.message}</p>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nombre de comptes:</span>
                                <span className="font-semibold">{soldeData?.totalSolde?.count || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Solde total:</span>
                                <span className="font-semibold text-green-600">
                  {soldeData?.totalSolde?.sum?.toFixed(2) || '0.00'}€
                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Solde moyen:</span>
                                <span className="font-semibold">
                  {soldeData?.totalSolde?.average?.toFixed(2) || '0.00'}€
                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Statistiques des transactions */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Transactions</h3>
                    {transactionError ? (
                        <p className="text-red-600">Erreur: {transactionError.message}</p>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total transactions:</span>
                                <span className="font-semibold">{transactionData?.transactionStats?.count || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total dépôts:</span>
                                <span className="font-semibold text-green-600">
                  {transactionData?.transactionStats?.sumDepots?.toFixed(2) || '0.00'}€
                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total retraits:</span>
                                <span className="font-semibold text-red-600">
                  {transactionData?.transactionStats?.sumRetraits?.toFixed(2) || '0.00'}€
                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
