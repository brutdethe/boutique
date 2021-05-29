<script>
	import { basket, rate } from '../stores.js';

	export let item;
	export let lang;

	const getBasketProduct = id => $basket.filter(product => product.id === id)[0];

	$: disabled = getBasketProduct(item.id) || item.stock < 1 ? true : false;

	function basketClick(item) {
		if (getBasketProduct(item.id) === undefined) {
			item.qty = 1;
			$basket = [...$basket, item];
			disabled = true;
		}
	}

	const dict = {
		buy: {
			en: 'buy',
			fr: 'acheter'
		}
	};
</script>

<style>
	.btn.btn-primary {
		color: #fff;
		border-color: #897853;
		background: #897853;
	}

	.btn.btn:focus,
	.btn.btn:hover {
		color: #fff;
		border-color: #6b5f45;
		background: #6b5f45;
	}
</style>

<button class="btn btn-primary float-right" on:click={basketClick(item)} {disabled}>
	{dict.buy[lang]}
</button>
