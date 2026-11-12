# AC Road Trip – POC (Dream & Launch)

Prototype visuel du site de road trips moto, à montrer à la cliente.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Déployer sur Vercel

1. Pousser ce dossier sur un repo GitHub.
2. Sur Vercel : **Add New → Project** → importer le repo (framework détecté : Next.js).
3. Aucune variable d'environnement nécessaire pour le POC.

Le site n'est pas indexé par Google (`robots: noindex` dans `app/layout.tsx`).

## Ce qui est simulé dans le POC

| Fonction | POC | Pour la vraie version |
|---|---|---|
| Connexion « Espace gestion » | Fictive (aucun mot de passe) | Lien magique par e-mail + `ADMIN_EMAILS` en variable d'env. (Supabase Auth ou Auth.js) |
| Road trips | Stockés dans le navigateur (localStorage) | Base de données (ex. Supabase Postgres) + routes API protégées |
| Photos | Compressées et stockées dans le navigateur | Supabase Storage / Vercel Blob / Cloudinary |
| Vidéo importée | Aperçu temporaire (perdu au rechargement) | Lien YouTube/Vimeo recommandé, ou stockage objet |
| Formulaire de contact | Message de confirmation seulement | Envoi d'e-mail (ex. Resend) |

⚠️ Les changements faits dans l'espace gestion ne sont visibles **que dans le navigateur de la personne qui les fait**. « Réinitialiser la démo » remet les road trips d'exemple.

## Structure

```
app/            layout (polices), page, styles globaux
components/     sections du site + Admin (espace gestion) + TripModal (fiche détaillée)
lib/            types, données d'exemple, store (contexte React + localStorage)
```

Les contenus (textes, prix, road trips) sont des exemples à remplacer par ceux de la cliente :
`lib/trips-data.ts`, `components/Concept.tsx`, `components/Faq.tsx`, `components/Contact.tsx`.
