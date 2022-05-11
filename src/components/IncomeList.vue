<template>
  <section>
    <div class="income-item">
      <div class="space desc">{{ data.income }}</div>
      <div class="space price">${{ data.price }}</div>
      <div class="space date">{{ data.date }}</div>
      <div class="btn">
        <div class="btn-edit" @click.prevent="updateIncome">update</div>
        <div class="btn-del" @click.prevent="deleteIncome">delete</div>
      </div>
    </div>

    <div class="modal__wrapper" v-if="this.open">
      <form class="income-form" @submit.prevent="updateIncomeMethod">
        <div class="form-inner">
          <input v-model="income" :placeholder="data.income" type="text"/>
          <input v-model="price" min="0" :placeholder="data.price" type="number"/>
          <input v-model="date" :placeholder="data.date" type="date"/>
          <input type="submit" value="Update"/>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import {db} from "@/utils"
export default {
  props: ['data'],
  data() {
    return {
      open: false,
      income: '',
      price: '',
      date: ''
    }
  },
  methods: {
    updateIncome() {
      this.open = !this.open
    },

    updateIncomeMethod() {
      let promise = db.updateDocument(this.data.$collection, this.data.$id, {
        income: this.income,
        price: this.price,
        date: this.date
      });
      this.open = false;
      promise.then(
          () => {
            this.$emit('refreshData');
          },
          (err) => {
            console.log(err);
          }
      );
    },

    deleteIncome() {
      let promise = db.deleteDocument(this.data.$collection, this.data.$id);
      promise.then(
          () => {
            this.$emit('refreshData');
          },
          (err) => {
            console.log('error occured', err);
          }
      );
    }
  }
}
</script>

<style scoped>
section {
  padding: unset;
}

.income-item {
  background: #ffffff;
  padding: 0.625em 0.94em;
  border-radius: 5px;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 2em 0;
}

.space + .space {
  margin-top: 1em;
}

.desc {
  font-size: 1.5rem;
}

.btn {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: .75em;
  text-transform: capitalize;
}

.btn-edit {
  color: var(--grey)
}

.btn-del {
  margin-left: 10px;
  color: var(--alert);
}

.btn-edit, .btn-del {
  cursor: pointer
}

@media screen and (min-width: 768px) {
  .desc {
    font-size: 2rem;
  }

  .price {
    font-size: 1.5rem;
  }

  .date {
    font-size: 1.5rem;
  }

  .btn-edit, .btn-del {
    font-size: 1.5rem
  }

}

@media screen and (min-width: 1200px) {
  .income-item, .modal__wrapper {
    width: 80%;
    margin-inline: auto
  }
}
</style>