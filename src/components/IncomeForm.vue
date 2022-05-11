<template>
  <section>
    <form class="income-form" @submit.prevent="addIncome">
      <div class="form-inner">
        <input v-model="income" placeholder="Income Description" type="text"/>
        <input v-model="price" min="0" placeholder="Price..." type="number"/>
        <input v-model="date" placeholder="Income date..." type="date"/>
        <input type="submit" value="Add Income"/>
      </div>
    </form>
  </section>
</template>

<script>
import {COLLECTION_ID, db} from "@/utils";

export default {
  props: ['fetchLists'],
  data() {
    return {
      income: "",
      price: "",
      date: null
    }
  },
  methods: {
    addIncome() {
      if (this.income === '' && this.price === '' && this.date === '') {
        return;
      }

      let promise = db.createDocument(COLLECTION_ID, 'unique()', {
        income: this.income.charAt(0).toUpperCase() + this.income.slice(1),
        price: this.price,
        date: this.date
      })

      promise.then(() => {
        this.fetchLists()
        this.income = ''
        this.price = ''
        this.date = ''
      }, (err) => {
        console.log(err)
      })
    }
  }
}

</script>