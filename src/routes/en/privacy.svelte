<script>
	import { loadSetup } from '../../stores.js';

	let setup = loadSetup();
</script>

<style>
	a,
	a:visited {
		color: #897853;
		border-color: #897853;
	}

	a:focus,
	a:hover {
		text-decoration: none;
		color: #6b5f45;
	}
</style>

<h1>Privacy</h1>

<p>
	The site
	<a href="https://{$setup.site}">{$setup.site}</a>
	does not collect personal data.
</p>
