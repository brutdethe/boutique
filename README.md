# Boutique de thé

## À propos de l'organisation

### Les fonctionnalités

Backlog du produit : https://github.com/orgs/brutdethe/projects/1

### L'équipe

- [Stéphane Langlois](https://github.com/pntbr) (scopyleft/échappée belle/Brut de Thé) - développement
- [Jé le Potier](https://www.theiere-tasse.com) - PO 

## À propos de la technique

- framework JavaScript : https://sapper.svelte.dev - https://svelte.dev
- framework css : https://picturepan2.github.io/spectre/

### Organisation GitHub

Le site est déployé sur la branche [heroku](https://heroku.com)  
Et les sources sont présentes sur la branche principale : [_dev_](../../tree/dev)

### Pour lancer le site en local

`$ npm run dev & open http://localhost:3000`

### Pour déployer 

Le déploiement est automatisé à partir de la branche [_dev_](../../tree/dev) vers *heroku*

### Stripe

#### Pour stocker les clés

On utilise [dotenv](https://github.com/motdotla/dotenv) pour récupérer les variables stockées dans un fichier *.env*  
C'est dans ce ficher que l'on place la [clé stripe](https://dashboard.stripe.com/test/apikeys) :
`stripe_secret=sk_test_66HYYSHXXXXXXXXXXXXXXXXXXX`

Pour *heroku* la clé est stockée dans les *settings*

#### Pour créer des produits dans stripe

`$ node --experimental-modules scripts/createProducts.mjs`

## Les photos

Les photos des produits sont à déposer dans le dossier [photos](/photos) à la racine du dépôt. Les photos sont redimensionner automatiquement pour le *carrousel* et les *vignettes* de la page produit et sont stockées dans le dossier [images](/static/images).

Le [script](/scripts/optimize.js) de redimensionnement des images utilise le fichier de [produits](/static/produits.json) pour récupérer les noms de fichiers des photos.

La *vignette* est générée à partir du premier fichier indiqué dans la rubrique *photos* de chaque produit.

### Pour optimiser manuellement les photos

`$ npm run optimize`

## Licence

[CC1.0](LICENSE)
