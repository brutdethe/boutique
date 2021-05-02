<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

</script>

<style>
  section {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (min-width: 1400px) {
    section {
      max-width: 90em;
    }
  }

  @media (max-width: 768px) {
    section {
      padding: 2em 1em;
    }
  }
</style>

<Nav />

<section>
  <slot />
</section>

<Footer />
