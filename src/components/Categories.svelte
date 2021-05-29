<script>
	import { goto, stores } from '@sapper/app';
	import { loadCategories, categorySelected } from '../stores.js';

	export let categories;
	export let lang;

	const { page } = stores();
	const { path, query } = $page;

	if (query.categorie) {
		categorySelected.set(query.categorie);
	}

	let categoriesWording = loadCategories();

	function changeCategory(evt) {
		categorySelected.set(evt.currentTarget.value);
		goto(`${path}?categorie=${$categorySelected}`);
	}

	const isCategoryExists = (categories, categorySelected) =>
		categories.indexOf(categorySelected) !== -1;
</script>

<style>
	.hero-body {
		padding: 0.8rem;
		margin-bottom: 0.8rem;
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
		background: #897853;
	}

	hr {
		color: #ddd;
	}

	.btn-list {
		margin: -10px;
	}

	.btn,
	.btn:focus,
	.btn:hover {
		margin: 10px;
		box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
		color: #897853;
		border-color: #897853;
	}

	.btn-selected,
	.btn.btn-selected:focus,
	.btn.btn-selected:hover {
		background: #897853;
		border-color: #897853;
		color: #fff;
	}
</style>

{#if categories}
	<div class="hero-sm bg-primary">
		<div class="hero-body">
			<h3>{$categorySelected}</h3>
			{#if $categoriesWording[$categorySelected]}
				<p>{$categoriesWording[$categorySelected].description[lang]}</p>
			{/if}
		</div>
	</div>

	{#if categories.length > 1}
		<div class="btn-list">
			{#each categories as category}
				<button
					class="btn btn-sm {category === $categorySelected ? 'btn-selected' : ''}"
					on:click={changeCategory}
					value={category}>
					{#if $categoriesWording[category]}{$categoriesWording[category].titre[lang]}{/if}
				</button>
			{/each}
		</div>
	{/if}
{/if}

<hr />
