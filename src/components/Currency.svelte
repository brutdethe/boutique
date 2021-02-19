<script>
    import {currency} from "../stores.js";

    function changeCurrencySelected(evt) {
        currency.set($currency === "EUR" ? "USD" : "EUR");
    }
</script>

<style>
    .currency {
        line-height: 4em;
    }

    @media (max-width: 768px) {
        .currency {
            flex-basis: 25%;
        }
    }
</style>

<div class="currency column col-1">
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
