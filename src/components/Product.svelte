<script>
	import { rate, loadProducts, categorySelected, githubDataRepo } from '../stores.js';
	import Buy from '../components/Buy.svelte';
	import Price from '../components/Price.svelte';
	import Photo from '../components/Photo.svelte';
	import ProductNotFound from '../components/ProductNotFound.svelte';
	import Loading from '../components/Loading.svelte';

	export let id;
	export let lang;

	let product = loadProducts(id, $rate);
	let dataDomain;

	if (typeof window !== 'undefined') {
		const domain = new URL(window.location);
		if (domain.hostname !== 'localhost') {
			dataDomain = domain.hostname.replace('www.', '');
		}
	}

	const dict = {
		title: {
			en: 'product',
			fr: 'produit'
		},
		weight: {
			en: 'Weight',
			fr: 'Poids'
		},
		size: {
			en: 'Size',
			fr: 'Dimensions'
		},
		capacity: {
			en: 'Capacity',
			fr: 'Capacité'
		},
		location: {
			en: 'Location',
			fr: 'Lieu'
		},
		cultivar: {
			en: 'Cultivar',
			fr: 'Cultivar'
		},
		type: {
			en: 'Type',
			fr: 'Type'
		},
		producer: {
			en: 'Producer',
			fr: 'Producteur'
		},
		elevation: {
			en: 'Elevation',
			fr: 'Altitude'
		},
		card: {
			en: 'Card',
			fr: 'Fiche'
		},
		vintage: {
			en: 'Vintage',
			fr: 'Millésime'
		}
	};

	const photosUrl = `https://raw.githubusercontent.com/${$githubDataRepo}/main/`;

	function getWeight(weight, lang) {
		if (lang === 'en') {
			return `${(weight * 35.274).toFixed(2)}oz`;
		} else {
			return `${weight * 1000}g`;
		}
	}

	function getSize(size, lang) {
		const sentence = [];
		if ('largeur' in size) {
			if (lang === 'en') {
				sentence.push(`width: ${(size.largeur * 0.393701).toFixed(2)}in`);
			} else {
				sentence.push(`lg: ${size.largeur}cm`);
			}
		}
		if ('hauteur' in size) {
			if (lang === 'en') {
				sentence.push(`height: ${(size.hauteur * 0.393701).toFixed(2)}in`);
			} else {
				sentence.push(`ht: ${size.hauteur}cm`);
			}
		}
		return sentence.join(' x ');
	}

	function getStock(stock, lang) {
		if (lang === 'en') {
			return `${stock} item${stock > 1 ? 's' : ''} left`;
		} else {
			return `il reste ${stock} article${stock > 1 ? 's' : ''}`;
		}
	}

	function getCapacity(capacity, lang) {
		if (lang === 'en') {
			return `${(capacity * 0.03381).toFixed(2)}oz`;
		} else {
			return `${capacity}ml`;
		}
	}

	function getElevation(elevation, lang) {
		if (lang === 'en') {
			return `${Math.round(elevation * 3.2808)}ft`;
		} else {
			return `${elevation}m`;
		}
	}
</script>

<style>
	.card-carousel {
		padding: 0;
	}

	.carousel {
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
		width: 100%;
	}

	.carousel .carousel-container::before {
		padding-bottom: 66%;
	}

	dt,
	dd {
		float: left;
		margin: 0;
	}

	dt {
		clear: both;
	}

	.price {
		padding-top: 0.8rem;
		text-align: right;
		font-weight: 700;
		font-size: 1.5rem;
	}

	.btn {
		width: 5rem;
	}
</style>

<svelte:head>
	<title>{dict.title[lang]}-{id}</title>
	{#if dataDomain}
		<script async defer data-domain={dataDomain} src="https://plausible.io/js/plausible.js">

		</script>
	{/if}
</svelte:head>
{#if $product}
	{#if $product.hasOwnProperty('id')}
		<div class="columns">
			<div class="card column col-8 col-xs-12 card-carousel">
				{#if $product.photos.length}
					<div class="card-image carousel">
						{#each $product.photos as photo, count}
							<input
								class="carousel-locator"
								id="slide-{count + 1}"
								type="radio"
								name="carousel-radio"
								hidden="true"
								checked={!count && true} />
						{/each}
						<div class="carousel-container">
							{#each $product.photos as photo, count}
								<figure class="carousel-item">
									<label
										class="item-prev btn btn-action btn-lg"
										for="slide-{count ? count : $product.photos.length}">
										<i class="icon icon-arrow-left" />
									</label>
									<label
										class="item-next btn btn-action btn-lg"
										for="slide-{count + 2 <= $product.photos.length ? count + 2 : 1}">
										<i class="icon icon-arrow-right" />
									</label>
									<Photo
										alt={`${$product.titre[lang]} #${$product.id}`}
										{lang}
										url={`carousels/${photo}`} />

								</figure>
							{/each}
						</div>
						<div class="carousel-nav">
							{#each $product.photos as photo, count}
								<label class="nav-item text-hide c-hand" for="slide-{count + 1}">{count}</label>
							{/each}
						</div>
					</div>
				{/if}

			</div>
			<div class="card column col-4 col-xs-12">
				<div class="card-header">
					<div class="card-title h4">{$product.titre[lang]}</div>
				</div>
				<div class="card-body">
					<p>{$product.description[lang]}.</p>
					<dl>
						{#if 'cultivar' in $product}
							<dt>{dict.cultivar[lang]} :&nbsp;</dt>
							<dd>{$product.cultivar}</dd>
						{/if}
						{#if 'producteur' in $product}
							<dt>{dict.producer[lang]} :&nbsp;</dt>
							<dd>{$product.producteur}</dd>
						{/if}
						{#if 'village' in $product || 'province' in $product}
							<dt>{dict.location[lang]} :&nbsp;</dt>
							<dd>{$product.village || ''} - {$product.province || ''}</dd>
						{/if}
						{#if 'altitude' in $product}
							<dt>{dict.elevation[lang]} :&nbsp;</dt>
							<dd>{getElevation($product.altitude, lang)}</dd>
						{/if}
						{#if 'millésime' in $product}
							<dt>{dict.vintage[lang]} :&nbsp;</dt>
							<dd>{$product.millésime}</dd>
						{/if}
						{#if 'capacité' in $product}
							<dt>{dict.capacity[lang]} :&nbsp;</dt>
							<dd>{getCapacity($product.capacité, lang)}</dd>
						{/if}
						{#if 'poids' in $product}
							<dt>{dict.weight[lang]} :&nbsp;</dt>
							<dd>{getWeight($product.poids, lang)}</dd>
						{/if}
						{#if 'dimension' in $product}
							<dt>{dict.size[lang]} :&nbsp;</dt>
							<dd>{getSize($product.dimension, lang)}</dd>
						{/if}
						<dt>Stock :&nbsp;</dt>
						<dd>{getStock($product.stock, lang)}</dd>
					</dl>
				</div>
				<div class="card-footer">
					<h3 class="card-title h1 price">
						<Price price={$product.prix} />
					</h3>
					<Buy item={$product} {lang} />
				</div>
			</div>
		</div>
	{:else}
		<Loading />
	{/if}
{:else}
	<ProductNotFound {lang} />
{/if}
