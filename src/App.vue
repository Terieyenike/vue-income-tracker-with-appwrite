<template>
  <section class="container">
    <Header :totalIncome="lists"/>
    <IncomeForm :fetchLists="fetchLists"/>
    <div v-for="data in lists" :key="data.income">
      <IncomeList :data="data" v-on:refreshData="fetchLists" />
    </div>
  </section>

</template>

<script>
import Header from "./components/Header"
import IncomeForm from './components/IncomeForm'
import IncomeList from "./components/IncomeList";

import {COLLECTION_ID, db} from "@/utils";

export default {
  name: 'App',
  components: {
    Header,
    IncomeForm,
    IncomeList
  },
  created() {
    this.fetchLists()
  },
  data() {
    return {
      lists: []
    }
  },
  methods: {
    fetchLists() {
      let promise = db.listDocuments(COLLECTION_ID)

      promise.then(
          (res) => {
            this.lists = res.documents;
          },
          (err) => {
            console.log(err);
          }
      );
    }
  }
}
</script>

<style>
:root {
  --light: #F8F8F8;
  --dark: #313131;
  --grey: #888;
  --primary: #FFCE00;
  --secondary: #FE4880;
  --alert: #FF1E2D;
  --bg-total-income: #DFDFDF;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Reset margins */
body,
h1,
h2,
h3,
h4,
h5,
p,
figure,
picture {
  margin: 0;
}

body {
  font-family: 'Montserrat', sans-serif;
  background: var(--light)
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: 400;
}

img,
picutre {
  max-width: 100%;
  display: block;
}

/* make form elements easier to work with */
input,
button,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

section {
  padding: 3em 0;
}

.container {
  max-width: 75rem;
  width: 85%;
  margin-inline: auto;
}

/*income form and income list styling*/
input {
  width: 100%;
  border: 1px solid gray;
}

.income-form {
  display: block;
}

.form-inner input {
  font-size: 1.125rem;
  padding: 0.625em 0.94em;
  background: #fff;
  border-radius: 5px;
}

input + input {
  margin-top: 2em;
}

.form-inner input[type=submit] {
  cursor: pointer;
  background-image: linear-gradient(to right, var(--primary) 50%, var(--primary) 50%, var(--secondary));
  background-size: 200%;
  background-position: 0%;
  color: var(--dark);
  text-transform: uppercase;
  transition: 0.4s;
  border: unset;
}

.form-inner input[type="submit"]:hover {
  background-position: 100%;
  color: #FFF;
}

@media screen and (min-width: 1200px) {
  .form-inner {
    display: flex;
    justify-content: center;
  }

  input + input {
    margin: 0;
  }

  input {
    border: unset;
  }

}
</style>
