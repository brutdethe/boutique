<script>
	import { basket, stripeKeySk, currency, rate, country, pagesPath } from '../stores.js';
	import Price from '../components/Price.svelte';
	import Countries from '../components/Countries.svelte';

	export let lang;
	let dataDomain;

	if (typeof window !== 'undefined') {
		const domain = new URL(window.location);
		if (domain.hostname !== 'localhost') {
			dataDomain = domain.hostname.replace('www.', '');
		}
	}

	function checkout() {
		const stripe = Stripe($stripeKeySk);
		const data = {
			basket: $basket,
			language: lang,
			shipping: transport,
			currency: $currency,
			country: $country
		};

		fetch('/server/checkout-session-id', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(r => r.json())
			.then(result => stripe.redirectToCheckout({ sessionId: result.session.id }))
			.catch(err => {
				console.log('POST error', err.message);
			});
	}

	function shippingCost(basket, country) {
		const collisimo = {
			france: [
				{ limit: 0.25, price: { EUR: 5, USD: Math.ceil(5 * $rate) } },
				{ limit: 0.5, price: { EUR: 6, USD: Math.ceil(6 * $rate) } },
				{ limit: 0.75, price: { EUR: 7, USD: Math.ceil(7 * $rate) } },
				{ limit: 1, price: { EUR: 8, USD: Math.ceil(8 * $rate) } },
				{ limit: 2, price: { EUR: 9, USD: Math.ceil(9 * $rate) } },
				{ limit: 5, price: { EUR: 14, USD: Math.ceil(14 * $rate) } },
				{ limit: 10, price: { EUR: 21, USD: Math.ceil(21 * $rate) } },
				{ limit: 15, price: { EUR: 26, USD: Math.ceil(26 * $rate) } },
				{ limit: 30, price: { EUR: 32, USD: Math.ceil(32 * $rate) } }
			],
			europe: [
				{ limit: 0.25, price: { EUR: 7, USD: Math.ceil(7 * $rate) } },
				{ limit: 0.5, price: { EUR: 8, USD: Math.ceil(8 * $rate) } },
				{ limit: 0.75, price: { EUR: 9, USD: Math.ceil(9 * $rate) } },
				{ limit: 1, price: { EUR: 14, USD: Math.ceil(14 * $rate) } },
				{ limit: 2, price: { EUR: 21, USD: Math.ceil(21 * $rate) } },
				{ limit: 5, price: { EUR: 26, USD: Math.ceil(26 * $rate) } },
				{ limit: 10, price: { EUR: 32, USD: Math.ceil(32 * $rate) } },
				{ limit: 15, price: { EUR: 38, USD: Math.ceil(38 * $rate) } },
				{ limit: 30, price: { EUR: 43, USD: Math.ceil(43 * $rate) } }
			],
			international: [
				{ limit: 0.5, price: { EUR: 28, USD: Math.ceil(28 * $rate) } },
				{ limit: 1, price: { EUR: 32, USD: Math.ceil(32 * $rate) } },
				{ limit: 2, price: { EUR: 43, USD: Math.ceil(43 * $rate) } },
				{ limit: 5, price: { EUR: 63, USD: Math.ceil(63 * $rate) } },
				{ limit: 10, price: { EUR: 119, USD: Math.ceil(119 * $rate) } },
				{ limit: 15, price: { EUR: 169, USD: Math.ceil(169 * $rate) } },
				{ limit: 20, price: { EUR: 206, USD: Math.ceil(206 * $rate) } }
			]
		};
		const weightTotal = basket.reduce((acc, product) => product.poids * product.qty + acc, 0) || 0;

		return collisimo[country].filter(rate => weightTotal <= rate.limit)[0].price;
		transport;
	}

	function calculateSubTotal(basket, currency) {
		return basket.reduce((acc, product) => product.prix[currency] * product.qty + acc, 0);
	}

	$: subTotal = {
		EUR: calculateSubTotal($basket, 'EUR'),
		USD: calculateSubTotal($basket, 'USD')
	};

	$: transport = shippingCost($basket, $country);
	$: total = {
		EUR: +transport['EUR'] + +subTotal['EUR'],
		USD: +transport['USD'] + +subTotal['USD']
	};

	function deleteClick(id) {
		$basket = $basket.filter(product => product.id !== id);
	}

	const dict = {
		title: { en: 'Summary of purchases', fr: 'Récapitulatif des achats' },
		empty: {
			en: 'There are no items in your shopping cart yet.',
			fr: "Il n'y a pas encore d'article dans votre panier."
		},
		backToShop: {
			en: 'back to the store',
			fr: 'revenir dans la boutique'
		},
		product: {
			en: 'item',
			fr: 'produit'
		},
		price: {
			en: 'price',
			fr: 'prix'
		},
		qty: {
			en: 'qty',
			fr: 'qté'
		},
		total: {
			en: 'total',
			fr: 'total'
		},
		order: {
			en: 'Placing the order',
			fr: 'Passez la commande'
		}
	};
</script>

<style>
	table {
		margin: 1rem 0;
	}
	.card {
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
	}
	.form-input {
		width: 3.5em;
	}
</style>

<svelte:head>
	<title>{dict.title[lang]}</title>
	<script src="https://js.stripe.com/v3/">

	</script>
</svelte:head>

<h2>{dict.title[lang]}</h2>

<div class="container">
	<div class="columns">
		{#if $basket.length}
			<table class="table table-striped table-hover column col-8">
				<thead>
					<tr>
						<th>{dict.product[lang]}</th>
						<th />
						<th class="text-right">{dict.price[lang]}</th>
						<th class="text-center">{dict.qty[lang]}</th>
						<th class="text-right">{dict.total[lang]}</th>
					</tr>
				</thead>
				<tbody>
					{#each $basket as item, index}
						{#if item.stock > 0}
							<tr class="active">
								<td>
									<a href="{$pagesPath['product'][lang]}-{item.id}">
										{item.titre[lang]} - {item.id}
									</a>
								</td>
								<td>
									<i class="icon icon-delete c-hand" on:click|once={deleteClick(item.id)} />
								</td>
								<td class="text-right">
									<Price price={item.prix} />
								</td>
								<td class="text-center">
									{#if item.stock > 1}
										<input
											class="form-input"
											type="number"
											bind:value={item.qty}
											min="1"
											max={item.stock} />
									{:else}{item.qty}{/if}
								</td>
								<td class="text-right">
									<Price price={item.prix} qty={item.qty} />
								</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
			<article class="card">
				<div class="card-header">
					<div class="card-title h5">Ticket</div>
				</div>
				<div class="card-body">
					<Countries />
					<table class="table">
						<tbody>
							<tr>
								<td>S/Total</td>
								<td class="text-right">
									<Price price={subTotal} />
								</td>
							</tr>
							<tr>
								<td>Transport</td>
								<td class="text-right">
									<Price price={transport} />
								</td>
							</tr>
							<tr class="active">
								<td class="text-bold">Total</td>
								<td class="text-right text-bold">
									<Price price={total} />
								</td>
							</tr>
						</tbody>
					</table>

				</div>
				<div class="card-footer">
					<button id="checkout-button" class="btn btn-success" on:click|once={checkout}>
						{dict.order[lang]}
					</button>
				</div>
			</article>
		{:else}
			<div class="empty column col-12">
				<div class="empty-icon">
					<i class="icon icon-stop" />
				</div>
				<p class="empty-title h5">{dict.empty[lang]}</p>
				<div class="empty-action">
					<a href="/" class="back-shop">&lsaquo; {dict.backToShop[lang]}</a>
				</div>
			</div>
		{/if}
	</div>
</div>
{#if $basket.length}
	<a href={lang === 'fr' ? '.' : `${lang}/`} class="back-shop">&lsaquo; {dict.backToShop[lang]}</a>
{/if}
