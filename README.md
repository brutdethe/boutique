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
Et les sources sont présentes sur la branche principale : [_dev_](https://github.com/brutdethe/shop/tree/main)

### Pour lancer le site en local

`$ npm run dev & open http://localhost:3000`

### Pour déployer 

`$ npm run deploy`

https://shop.brutdethé.fr

### Stripe

#### Pour stocker les clés

On utilise [dotenv](https://github.com/motdotla/dotenv) pour récupérer les variables stockées dans un fichier *.env*  
C'est dans ce ficher que l'on place la [clé stripe](https://dashboard.stripe.com/test/apikeys) :
`stripe_secret=sk_test_66HYYSHXXXXXXXXXXXXXXXXXXX`

#### Pour créer des produits dans stripe

`$ node --experimental-modules scripts/createProducts.mjs`

### Pour optimiser les photos

`$ npm run optimize`

## Licence

[CC1.0](LICENSE)
