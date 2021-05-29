<script>
	import { stores } from '@sapper/app';
	import { basket, pagesPath, loadSetup } from '../stores.js';
	import Currency from '../components/Currency.svelte';
	import Language from '../components/Language.svelte';

	const { page } = stores();

	let setup = loadSetup();

	$: lang = !!$page.path.match('^/en/') ? 'en' : 'fr';

	const dict = {
		nav_products: { en: 'shop', fr: 'boutique' },
		nav_about: { en: 'about', fr: 'à propos' },
		nav_basket: { en: 'basket', fr: 'panier' }
	};

	const basketCount = basket => basket.reduce((acc, product) => product.qty + acc, 0);
</script>

<style>
	header {
		max-width: 90em;
		margin: auto;
		align-items: center;
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 2em;
	}

	.title {
		margin-bottom: 0;
		padding: 0;
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.5;
		color: #897853;
	}

	.logo {
		width: 6rem;
		margin-left: -8px;
	}

	.i18n {
		padding: 0;
	}

	ul {
		display: flex;
		justify-content: flex-end;
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	ul li {
		margin-top: 0;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		color: #897853;
	}

	a:visited {
		color: #897853;
		border-color: #897853;
	}

	a:focus,
	a:hover {
		text-decoration: none;
		color: #6b5f45;
	}
	.badge:not([data-badge])::after,
	.badge[data-badge]::after {
		background: #897853;
	}

	@media (max-width: 840px) {
		.title {
			text-align: center;
		}

		ul {
			justify-content: flex-start;
		}
	}

	@media (max-width: 600px) {
		ul {
			justify-content: center;
		}
	}
</style>

<header class="columns">
	<h1 class="title column col-3 col-md-12">
		<a href="/">
			{#if $setup.logo}
				<img src={$setup.logo} alt="logo boutique" class="logo" />
			{:else}{$setup.nom || ''}{/if}
		</a>
	</h1>
	<nav class="column col-7 col-md-9 col-sm-12">
		<ul>
			<li>
				<a href={$pagesPath.index[lang]}>{dict.nav_products[lang]}</a>
			</li>
			<li>
				<a href={$setup.a_propos}>{dict.nav_about[lang]}</a>
			</li>
			<li>
				<a href={$pagesPath.basket[lang]}>
					<span class="badge" data-badge={basketCount($basket)} data-initial="YZ">
						{dict.nav_basket[lang]}
					</span>
				</a>
			</li>
		</ul>
	</nav>

	<!-- TOUTDOUX: aligner à droite-->
	<div class="i18n columns col-gapless column col-2 col-md-3 col-sm-12">
		<Currency />
		<Language />
	</div>
</header>
