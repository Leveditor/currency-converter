<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-center text-4xl text-gray-500 mb-5">Cotação</h1>
    <ValueCurrency />
  </div>
</template>

<script>
import ValueCurrency from './components/ValueCurrency.vue';
import './assets/tailwind.css';

export default {
  name: 'App',
  components: {
    ValueCurrency,
  },
};
</script>
