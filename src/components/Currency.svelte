<script>
	import { currency } from '../stores.js';

	function changeCurrencySelected(evt) {
		currency.set($currency === 'EUR' ? 'USD' : 'EUR');
	}
</script>

<style>
	.currency {
		flex-wrap: nowrap;
		line-height: 4em;
		text-align: left;
	}

	.btn,
	.btn:focus,
	.btn:hover {
		color: #897853;
		border-color: #897853;
	}

	@media (max-width: 600px) {
		.currency {
			text-align: left;
			padding-right: 10px !important;
		}
	}
</style>

<div class="currency column col-6">
	<button
		class="btn btn-sm {'EUR' === $currency ? 'bg-secondary' : ''}"
		on:click={changeCurrencySelected}
		value="EUR">
		€
	</button>
	<button
		class="btn btn-sm {'USD' === $currency ? 'bg-secondary' : ''}"
		on:click={changeCurrencySelected}
		value="USD">
		$
	</button>
</div>
