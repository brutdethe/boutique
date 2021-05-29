<script>
	import { loadSetup } from '../../stores.js';

	let setup = loadSetup();
</script>

<style>
	p {
		max-width: 960px;
	}

	a,
	a:visited {
		color: #897853;
		border-color: #897853;
	}

	a:focus,
	a:hover {
		text-decoration: none;
		color: #6b5f45;
	}
</style>

<h1>Legal notice</h1>
.
<p>
	The site
	<a href="https://{$setup.site}">{$setup.site}</a>
	is edited by {$setup.proprietaire}, {$setup.nom} and hosted by
	<a href="https://www.heroku.com/">Heroku</a>
	.
</p>

<p>
	company listed under the registration number {$setup.RCS} and the code {$setup.APE} with the {$setup.enregistrement}
	and whose head office is located at {$setup.adresse}.
</p>

<p>
	Payments are made via
	<a href="https://stripe.com/fr">Stripe</a>
	:
	<a href="https://stripe.com/fr/legal">Legal notice</a>

</p>

<p>
	Director of publication: {$setup.proprietaire} :
	<a href="mailto:{$setup.email}">{$setup.email}</a>
</p>

<p>
	This shop is created by :
	<a href="https://www.xn--brutdeth-i1a.fr">brutdethé.fr</a>
	<br />
	available under open-licence
	<a href="https://github.com/brutdethe/shop/blob/dev/LICENSE">CC0.1</a>
	:
	<a href="https://github.com/brutdethe/shop">https://github.com/brutdethe/shop</a>
</p>
