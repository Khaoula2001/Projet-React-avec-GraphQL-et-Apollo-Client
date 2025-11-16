import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

// Permet de configurer l'URL du backend GraphQL via variable d'environnement
// Définissez REACT_APP_GRAPHQL_URI dans un fichier .env (ex: http://localhost:8082/graphql)
const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:8082/graphql';

const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
    // Ajoutez des en-têtes communs si besoin (ex: auth)
    // headers: { Authorization: `Bearer ${token}` },
    // credentials: 'include' // décommentez si vous utilisez des cookies côté serveur
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
    },
});
