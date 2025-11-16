import React from "react";
import { useQuery } from '@apollo/client/react';
import { GET_ALL_COMPTES } from "../graphql/queries";
import { Compte } from "../graphql/interfaces";
import { GetAllComptesData } from "../apollo/types";
import { formatMAD } from "../utils/format";

const CompteList: React.FC = () => {
    const { loading, error, data } = useQuery<GetAllComptesData>(GET_ALL_COMPTES);

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Comptes</h2>
            <div className="space-y-4">
                {data?.allComptes?.map((compte: Compte) => (
                    <div key={compte.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-600">ID: {compte.id}</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    Solde: {formatMAD(compte.solde)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Date de création: {new Date(compte.dateCreation).toLocaleDateString('fr-MA')}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                compte.type === 'COURANT'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                {compte.type}
              </span>
                        </div>
                    </div>
                ))}
                {(!data?.allComptes || data.allComptes.length === 0) && (
                    <p className="text-gray-500 text-center py-4">Aucun compte trouvé</p>
                )}
            </div>
        </div>
    );
};

export default CompteList;
