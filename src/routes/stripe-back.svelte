<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  console.log($page.query);
</script>

<ul>
  <li>see console</li>
</ul>
