<script>
	import { goto } from '@sapper/app';
	import { rate, loadProducts, basket, pagesPath, categorySelected } from '../stores.js';
	import Categories from '../components/Categories.svelte';
	import Buy from '../components/Buy.svelte';
	import Price from '../components/Price.svelte';
	import Photo from '../components/Photo.svelte';
	import Loading from '../components/Loading.svelte';
	export let lang;

	let dataDomain = undefined;

	if (typeof window !== 'undefined') {
		const domain = new URL(window.location);
		if (domain.hostname !== 'localhost') {
			dataDomain = domain.hostname;
		}
	}

	const dict = {
		title: {
			en: "product's list",
			fr: 'liste des produits'
		},
		detail: {
			en: 'detail',
			fr: 'détail'
		}
	};

	let products = loadProducts(null, $rate);

	function find(products, query) {
		const properties = Object.getOwnPropertyNames(query);

		function checkQuery(item, query) {
			const result = false;
			if (query.hasOwnProperty('$gt')) {
				return item > query.$gt;
			}
			return item === query;
		}

		return products
			.filter(item =>
				properties.reduce((acc, prop) => {
					return acc && checkQuery(item[prop], query[prop]);
				}, {})
			)
			.sort((a, b) => new Date(b.création) - new Date(a.création));
	}

	function basketClick(evt) {
		const id = evt.currentTarget.getAttribute('data-product');
		basket.set([...$basket, id]);
	}
</script>

<style>
	/*.description {
    height: 10rem;
  }

  @media (min-width: 1400px) {
    .description {
      height: 6rem;
    }
  }*/

	.card {
		height: calc(100% - 1rem);
		margin-bottom: 1rem;
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.price {
		padding-top: 0.8rem;
		text-align: right;
		font-weight: 700;
	}
</style>

<svelte:head>
	<title>{dict.title[lang]}</title>

	{#if dataDomain}
		<script async defer data-domain={dataDomain} src="https://plausible.io/js/plausible.js">

		</script>
	{/if}

</svelte:head>
<header>
	<Categories categories={$products.categories} {lang} />
</header>
<section>
	<div class="columns">
		{#if $products.products}
			{#each find($products.products, {
				catégorie: $categorySelected,
				stock: { $gt: 0 }
			}) as product}
				<div class="column col-4 col-xs-12">
					<article class="card">
						<div class="card-header">
							<div class="card-title h5">{product.titre[lang]}</div>
							<div class="card-subtitle text-gray">{$categorySelected}</div>
						</div>
						<div class="card-image">
							<a href="{$pagesPath['product'][lang]}-{product.id}">
								<Photo
									alt={`${product.titre[lang]} #${product.id}`}
									url={`thumbs/${product.photos[0]}`} />
							</a>
						</div>
						<div class="card-body">
							<p class="description">{product.description[lang]}</p>
							<h3 class="price">
								<Price price={product.prix} />
							</h3>
						</div>
						<div class="card-footer">
							<div class="btn-group btn-group-block">
								<button
									class="detail btn btn-secondary"
									on:click|once={goto(`${$pagesPath['product'][lang]}-${product.id}`)}
									data-product={product.id}>
									{dict.detail[lang]}
								</button>
								<Buy item={product} {lang} />
							</div>
						</div>
					</article>
				</div>
			{/each}
		{:else}
			<Loading />
		{/if}
	</div>
</section>
