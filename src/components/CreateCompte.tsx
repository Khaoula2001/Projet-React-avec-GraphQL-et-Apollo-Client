import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';
import { TypeCompte } from '../graphql/types';

const CreateCompte: React.FC = () => {
    const [solde, setSolde] = useState<string>('');
    const [type, setType] = useState<TypeCompte>(TypeCompte.COURANT);
    const [message, setMessage] = useState<string>('');

    const [saveCompte, { loading }] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }],
        onCompleted: () => {
            setMessage('Compte créé avec succès!');
            setSolde('');
            setType(TypeCompte.COURANT);
            setTimeout(() => setMessage(''), 3000);
        },
        onError: (error: Error) => {
            setMessage(`Erreur: ${error.message}`);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!solde || parseFloat(solde) <= 0) {
            setMessage('Veuillez entrer un solde valide');
            return;
        }

        try {
            await saveCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        type,
                    },
                },
            });
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Créer un Compte</h2>
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
                        Solde initial :
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={solde}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSolde(e.target.value)}
                        required
                        placeholder="Entrez le solde initial"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de compte :
                    </label>
                    <select
                        value={type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as TypeCompte)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={TypeCompte.COURANT}>Courant</option>
                        <option value={TypeCompte.EPARGNE}>Épargne</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? 'Création...' : 'Créer un compte'}
                </button>
            </form>
        </div>
    );
};

export default CreateCompte;
