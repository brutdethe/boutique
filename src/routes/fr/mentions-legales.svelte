<script>
	import { loadSetup } from '../../stores.js';

	let setup = loadSetup();
</script>

<style>
	p {
		max-width: 960px;
	}
</style>

<h1>Mention légales</h1>

<p>
	Le site
	<a href="https://{$setup.site}">{$setup.site}</a>
	est édité par {$setup.proprietaire}, {$setup.nom} et hébergé par
	<a href="https://www.heroku.com/">Heroku</a>
	.
</p>
<p>
	Entreprise répertoriée sous le numéro d’immatriculation {$setup.RCS} et le code APE {$setup.APE}
	auprès du {$setup.enregistrement} et dont le siège social est sis au {$setup.siege}.
</p>

<p>
	Les paiements sont effectués via
	<a href="https://stripe.com/fr">Stripe</a>
	:
	<a href="https://stripe.com/fr/legal">Mentions légales</a>

</p>

<p>
	Directeur de la publication : {$setup.proprietaire} :
	<a href="mailto:{$setup.email}">{$setup.email}</a>
</p>

<p>
	Cette boutique est créée par
	<a href="https://www.brutdethé.fr">brutdethé.fr</a>
	<br />
	le produit est disponible en licence ouverte
	<a href="https://github.com/brutdethe/shop/blob/dev/LICENSE">CC0.1</a>
	:
	<a href="https://github.com/brutdethe/shop">https://github.com/brutdethe/shop</a>
</p>
