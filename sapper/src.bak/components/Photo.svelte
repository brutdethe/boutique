<script>
  import { githubDataRepo } from "../stores.js";
  export let alt;
  export let url;

  const photosUrl = `https://raw.githubusercontent.com/${$githubDataRepo}/main/`;
</script>

<img class="img-responsive" src={new URL(url, photosUrl)} {alt} />
