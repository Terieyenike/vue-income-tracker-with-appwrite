<template>
  <header>
    <h1>Income Tracker</h1>
    <div class="total-income">
      ${{sum}}

    </div>
  </header>
</template>

<script>
export default {
  props: ['totalIncome'],
  computed: {
    sum () {
      return this.totalIncome.reduce((acc, item) => acc + item.price, 0);
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1, .total-income {
  color: var(--grey);
  font-weight: 700;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-size: 2rem;
}

.total-income {
  font-size: 1.75rem;
  background: var(--bg-total-income);
  padding: .3125rem 1.5625rem;
  border-radius: 0.5rem;
}
</style>