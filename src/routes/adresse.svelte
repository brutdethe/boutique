<script>
  import { languageSelected } from "../stores.js";

  function handleSubmit(evt) {
    const formValues = {
      lastName: evt.target["last-name"].value,
      firstName: evt.target["first-name"].value,
      email: evt.target.email.value,
      street: evt.target.street.value,
      zip: evt.target.zip.value,
      town: evt.target.town.value,
      country: evt.target.country.value,
      message: evt.target.message.value
    };

    console.log("target:", formValues);
  }

  const dict = {
    lastName: {
      en: "Last Name",
      fr: "Nom"
    },
    firstName: {
      en: "First Name",
      fr: "Prénom"
    },
    street: {
      en: "Street",
      fr: "Rue"
    },
    zip: {
      en: "Zip",
      fr: "Code postal"
    },
    town: {
      en: "Town",
      fr: "Ville"
    },
    country: {
      en: "Country",
      fr: "Pays"
    },
    submit: {
      en: "Create address",
      fr: "Créer mon adresse"
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label class="form-label" for="last-name">
      {dict.lastName[$languageSelected]}
    </label>
    <input
      class="form-input"
      type="text"
      id="last-name"
      placeholder={dict.lastName[$languageSelected]} />

    <label class="form-label" for="first-name">
      {dict.firstName[$languageSelected]}
    </label>
    <input
      class="form-input"
      type="text"
      id="first-name"
      placeholder={dict.firstName[$languageSelected]} />

    <label class="form-label" for="email">Email</label>
    <input class="form-input" type="text" id="email" placeholder="Email" />

    <label class="form-label" for="street">
      {dict.street[$languageSelected]}
    </label>
    <input
      class="form-input"
      type="text"
      id="street"
      placeholder={dict.street[$languageSelected]} />

    <label class="form-label" for="zip">{dict.zip[$languageSelected]}</label>
    <input
      class="form-input"
      type="text"
      id="zip"
      placeholder={dict.zip[$languageSelected]} />

    <label class="form-label" for="town">{dict.town[$languageSelected]}</label>
    <input
      class="form-input"
      type="text"
      id="town"
      placeholder={dict.town[$languageSelected]} />

    <label class="form-label" for="country">
      {dict.country[$languageSelected]}
    </label>
    <input
      class="form-input"
      type="text"
      id="country"
      placeholder={dict.country[$languageSelected]} />
    <label class="form-label" for="message">Message</label>
    <textarea class="form-input" id="message" placeholder="Textarea" rows="3" />
    <button type="submit">{dict.submit[$languageSelected]}</button>
  </div>
</form>
