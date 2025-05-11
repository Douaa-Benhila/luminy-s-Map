##  Présentation Visuelle du Projet : LUMIN’S MAP

LUMIN’S MAP est une application web interactive permettant de se repérer facilement dans les bâtiments de l’Université d’Aix-Marseille, campus de Luminy. Ce projet mêle développement web front-end et back-end pour offrir une expérience utilisateur fluide et pratique.

###  Technologies utilisées
- **Front-end** : HTML, CSS, JavaScript
- **Back-end** : Python avec Flask
- **API** : Intégration de Google Maps API
- **Outils de versioning** : GitLab

###  Pages principales

####  Page d’accueil
- Texte d’introduction personnalisé
- Header dynamique intégré avec `navbar.html`
- Footer inclus directement dans le fichier `home.html`
- Affichage conditionnel de rubriques si l'utilisateur est connecté

####  Page de Connexion & Inscription
- Un formulaire unique gérant connexion et inscription
- Stockage sécurisé des utilisateurs dans une base de données
- Gestion des erreurs : mauvais identifiants, compte existant, etc.
- Redirection vers la carte en cas de succès

####  Page de Carte Interactive
- Carte Google Maps affichée avec positionnement initial centré
- Sélection de départ/arrivée via deux listes déroulantes
- Itinéraire calculé en temps réel (sans appel à une API d’itinéraire)
- Ajout de marqueurs personnalisés et d’info-bulles
- Suivi en temps réel de la position de l’utilisateur avec un curseur animé
- Possibilité de nettoyer un itinéraire précédent avant d’en créer un nouveau

####  Déconnexion
- Gestion simple via Flask (pas de page dédiée)
