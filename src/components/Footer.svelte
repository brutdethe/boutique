<script>
	import { stores } from '@sapper/app';
	import { pagesPath } from '../stores.js';

	const { page } = stores();

	$: lang = !!$page.path.match('^/en/') ? 'en' : 'fr';

	const dict = {
		legal: { en: 'publisher', fr: 'mentions légales' },
		privacy: { en: 'privacy', fr: 'confidentialité' }
	};
</script>

<style>
	footer {
		border-top: 1px solid rgba(255, 62, 0, 0.1);
		padding: 1.8rem 0.75rem 1rem;
		position: relative;
		z-index: 200;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	a,
	a:visited {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		color: #897853;
		border-color: #897853;
	}

	a:focus,
	a:hover {
		text-decoration: none;
		color: #6b5f45;
	}
</style>

<footer class="section section-footer">
	<ul class="container grid-lg">
		<li>
			<a href={$pagesPath.privacy[lang]}>{dict.privacy[lang]}</a>
		</li>
		<li>
			<a href={$pagesPath.publisher[lang]}>{dict.legal[lang]}</a>
		</li>
	</ul>
</footer>
