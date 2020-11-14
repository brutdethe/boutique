<script>
  import { category, language } from "../stores.js";

  const changeCategory = evt => category.set(evt.currentTarget.value);
  const dict = {
    categoriesText: {
      Gaiwan: {
        en: "The gaiwan or zhong is the ideal utensil.",
        fr: "Le gaiwan ou zhong, est l'ustensile idéal"
      },
      Théière: {
        en:
          "Each teapot I make represents a unique piece in which I am involved and apply myself.",
        fr:
          "Chaque théière que je fabrique, représente une pièce unique dans laquelle je m'implique et je m'applique."
      },
      Tasse: {
        en: "Without a cup we couldn't drink tea.",
        fr: "Sans tasse on ne pourrait pas boire le thé."
      },
      Shiboridashi: {
        en:
          'Shiboridashi are Japanese infusers, mainly intended for the infusion of "gyokuro" (green tea particularly rich in taste).',
        fr:
          "Les shiboridashi sont des infuseurs japonais, principalement destinés à l'infusion des « gyokuro » (thé vert particulièrement riche en goût.)"
      },
      Kyusu: {
        en:
          "If I stop at the shape of this teapot, there are no apparent difficulties in its realization. That said, there are many subtleties that make this teapot a particularly demanding piece.",
        fr:
          "Si je m’arrête à la forme de cette théière, il n'y a pas de difficultés apparentes dans sa réalisation. Ceci dit, cette pièce renferme de multiples subtilités, qui font de cette théière une pièce particulièrement exigeante."
      }
    }
  };
</script>

<style>
  .hero-body {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }
  hr {
    color: #ddd;
  }
</style>

<label>
  <input
    type="radio"
    bind:group={$category}
    on:change={changeCategory}
    value="Tasse" />
  Tasse
</label>
<label>
  <input
    type="radio"
    bind:group={$category}
    on:change={changeCategory}
    value="Gaiwan" />
  Gaiwan
</label>
<label>
  <input
    type="radio"
    bind:group={$category}
    on:change={changeCategory}
    value="Théière" />
  Théière
</label>
<label>
  <input
    type="radio"
    bind:group={$category}
    on:change={changeCategory}
    value="Shiboridashi" />
  Shiboridashi
</label>
<label>
  <input
    type="radio"
    bind:group={$category}
    on:change={changeCategory}
    value="Kyusu" />
  Kyusu
</label>

<hr />

<div class="hero-sm bg-dark">
  <div class="hero-body">
    <h3>{$category}</h3>
    <p>{dict.categoriesText[$category][$language]}</p>
  </div>
</div>
