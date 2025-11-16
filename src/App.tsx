import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
// Statistiques retirées suivant la demande

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                        Gestion des Comptes et Transactions
                    </h1>

                    {/* Section Statistiques supprimée */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Colonne gauche : Gestion des comptes */}
                        <div className="space-y-6">
                            <CreateCompte />
                            <CompteList />
                        </div>

                        {/* Colonne droite : Gestion des transactions */}
                        <div className="space-y-6">
                            <TransactionForm />
                            <TransactionList />
                        </div>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;
