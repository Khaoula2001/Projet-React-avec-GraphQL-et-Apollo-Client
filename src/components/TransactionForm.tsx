import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { TypeTransaction } from '../graphql/types';
import { Compte } from '../graphql/interfaces';
import { GetAllComptesData } from "../apollo/types";
import { formatMAD } from "../utils/format";

const TransactionForm: React.FC = () => {
    const [montant, setMontant] = useState<string>('');
    const [type, setType] = useState<TypeTransaction>(TypeTransaction.DEPOT);
    const [compteId, setCompteId] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const { data: comptesData, loading: comptesLoading } = useQuery<GetAllComptesData>(GET_ALL_COMPTES);

    const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_COMPTES },
            { query: GET_ALL_TRANSACTIONS }
        ],
        onCompleted: () => {
            setMessage('Transaction ajoutée avec succès!');
            setMontant('');
            setCompteId('');
            setTimeout(() => setMessage(''), 3000);
        },
        onError: (error: Error) => {
            setMessage(`Erreur: ${error.message}`);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!montant || parseFloat(montant) <= 0 || !compteId) {
            setMessage('Veuillez remplir tous les champs correctement');
            return;
        }

        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        type,
                        montant: parseFloat(montant),
                        compteId,
                        date: new Date().toISOString().split('T')[0]
                    },
                },
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la transaction :', error);
        }
    };

    useEffect(() => {
        // Vérification plus stricte pour éviter les erreurs TypeScript
        if (comptesData?.allComptes && comptesData.allComptes.length > 0 && !compteId) {
            setCompteId(comptesData.allComptes[0].id);
        }
    }, [comptesData, compteId]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter une Transaction</h2>
            {message && (
                <div className={`mb-4 p-3 rounded ${
                    message.includes('Erreur')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                }`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de transaction :
                    </label>
                    <select
                        value={type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as TypeTransaction)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={TypeTransaction.DEPOT}>Dépôt</option>
                        <option value={TypeTransaction.RETRAIT}>Retrait</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Montant :
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={montant}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMontant(e.target.value)}
                        required
                        placeholder="Entrez le montant"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compte :
                    </label>
                    {comptesLoading ? (
                        <p className="text-gray-500">Chargement des comptes...</p>
                    ) : (
                        <select
                            value={compteId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCompteId(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Sélectionnez un compte</option>
                            {comptesData?.allComptes?.map((compte: Compte) => (
                                <option key={compte.id} value={compte.id}>
                                    {compte.type} - {formatMAD(compte.solde)} (ID: {compte.id})
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading || comptesLoading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                    {loading ? 'Ajout...' : 'Ajouter la transaction'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
