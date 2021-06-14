<script>
	export let lang;
	let dataDomain;

	if (typeof window !== 'undefined') {
		const domain = new URL(window.location);
		if (domain.hostname !== 'localhost') {
			dataDomain = domain.hostname.replace('www.', '');
		}
	}

	const dict = {
		title: {
			en: 'Uknown product',
			fr: 'Produit inconnu'
		},
		message: {
			en: 'Unless otherwise stated, this product is no longer in stock.',
			fr: "Apparement, ce produit n'est plus en stock."
		},
		backToShop: {
			en: 'back to the store',
			fr: 'revenir dans la boutique'
		}
	};
</script>

<svelte:head>
	<title>{dict.title[lang]} {dataDomain}</title>

	<script async defer data-domain={dataDomain} src="https://plausible.io/js/plausible.js">

	</script>
</svelte:head>

<div class="container">
	<div class="columns">
		<div class="empty column col-12">
			<div class="empty-icon">
				<i class="icon icon-fail" />
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
