# Compte rendu — Liaison Frontend React ↔ Backend GraphQL

Résumé
Ce document présente le contexte, l'objectif, la procédure suivie pour connecter le frontend (React + Apollo Client) au backend GraphQL (Spring Boot).

Contexte et objectif
- Contexte : projet frontend React consommant un backend GraphQL développé en Spring Boot.
- Objectif : configurer et vérifier la connexion entre le frontend et le backend, documenter la procédure et fournir une preuve (vidéo).

Configuration de l'URL GraphQL
- Copier `.env.example` en `.env` à la racine du projet frontend.
- Modifier la valeur si nécessaire :
  REACT_APP_GRAPHQL_URI=http://localhost:8082/graphql
- Comportement par défaut : si la variable n'est pas fournie, l'URL `http://localhost:8082/graphql` est utilisée.

Pré-requis côté backend
- Assurer que le backend Spring Boot autorise CORS pour l'origine `http://localhost:3000` sur le chemin `/graphql`.
- Port par défaut : `8082` (vérifier `server.port` dans `application.properties`).
- Interface GraphiQL (si activée) : `http://localhost:8082/graphiql`.

Procédure de démarrage

1. Démarrage du backend (Spring Boot)
   - Lancer l'application Spring Boot (maven/gradle ou IDE).
   - Vérifier l'écoute sur le port configuré (par défaut 8082).

2. Démarrage du frontend (React)
   - Depuis le répertoire du frontend :
     npm install
     npm start
   - L'application sera disponible sur : http://localhost:3000

Vidéo de démonstration

https://github.com/user-attachments/assets/173cd9b4-2707-4799-b55b-b43a9c9c52c3
