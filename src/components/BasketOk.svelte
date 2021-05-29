<script>
	import { basket } from '../stores.js';

	export let lang;

	const dict = {
		title: { en: 'Purchases made', fr: 'Achats effectués' },
		message: {
			en: 'Thank you for your confidence, we prepare your shipment.',
			fr: 'Merci pour votre confiance, nous préparons votre envoi.'
		},
		backToShop: {
			en: 'back to the store',
			fr: 'revenir dans la boutique'
		}
	};

	$basket = [];
</script>

<svelte:head>
	<title>{dict.title[lang]}</title>
</svelte:head>
<h2>{dict.title[lang]}</h2>

<div class="container">
	<div class="columns">
		<div class="empty column col-12">
			<div class="empty-icon">
				<i class="icon icon-check" />
			</div>
			<p class="empty-title h5">{dict.message[lang]}</p>
			<div class="empty-action">
				<a href={lang === 'fr' ? '.' : `${lang}/`} class="back-shop">
					&lsaquo; {dict.backToShop[lang]}
				</a>
			</div>
		</div>
	</div>
</div>
