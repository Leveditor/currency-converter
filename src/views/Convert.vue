<template>
  <div class="md:flex items-center mb-5">
    <router-link to="/" class="mr-2 bg-gray-300 rounded-full p-3 md:p-0"> <i class="fa-solid fa-arrow-left text-2xl md:p-3 md:py-2"></i></router-link>
    <div class="flex items-center justify-center w-full mt-4 md:mt-0">
      <h1 class="text-4xl text-gray-800 mb-5 font-bold">Conversor de moeda</h1>
    </div>
  </div>

  <div class="border rounded-lg p-12 shadow-2xl">
    <p class="bg-yellow-500 text-white pl-5 rounded w-full text-center">
      {{ messageError }}
    </p>
    <div class="md:flex justify-around">
      <div>
        <select v-model="selectedCurrency" @change="fetchCurrencyData" class="w-full py-5 px-12 border bg-white shadow-xl mt-5">
          <option disabled value="">Selecione uma moeda</option>
          <option v-for="currency in currencies" :value="currency.code" :key="currency.code" v-show="!removedCurrency.includes(currency.name)">{{ currency.code }}</option>
        </select>
        <div v-if="currencyData" class="mt-8">
          <input type="text" v-model="inputValue" class="w-full border pl-2 rounded p-5 shadow-lg" placeholder="Digite o valor a ser convertido" />
        </div>
      </div>
      <div>
        <select v-model="secondSelectedCurrency" @change="fetchCurrencyData" class="w-full py-5 px-12 border bg-white shadow-2xl mt-5">
          <option disabled value="">Selecione uma moeda</option>
          <option v-for="currency in currencies" :value="currency.code" :key="currency.code" v-show="!removedCurrency.includes(currency.name)">{{ currency.code }}</option>
        </select>
        <div v-if="currencyData" class="mt-8">
          <input type="text" :value="convertedValue" class="w-full border pl-2 rounded p-5 shadow-lg cursor-not-allowed" disabled placeholder="Resultado"/>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-5 md:mt-0" v-if="secondSelectedCurrency && selectedCurrency">
      <div>
        <img :src="`https://wise.com/web-art/assets/flags/${selectedCurrency.toLowerCase()}.svg`" class="w-10 ml-4 border border-gray-300 rounded-full" />
      </div>
      <div class="pl-4 pt-3">X</div>
      <div>
        <img :src="`https://wise.com/web-art/assets/flags/${secondSelectedCurrency.toLowerCase()}.svg`" class="w-10 ml-4 border border-gray-300 rounded-full" />
      </div>
    </div>
    <div class="flex justify-center mt-5" v-if="currencyData">
      <button @click="convertCurrency" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">Converter</button>
    </div>
  </div>
</template>

<script>
import api from '../api/api.js';
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'CurrencyConverter',
  data() {
    return {
      selectedCurrency: '',
      secondSelectedCurrency: '',
      currencyData: null,
      convertedValue: null,
      inputValue: '',
      messageError: '',
      removedCurrency: [
        'Litecoin/Real Brasileiro',
        'Bitcoin/Real Brasileiro',
        'Ethereum/Real Brasileiro',
        'XRP/Real Brasileiro',
        'Dogecoin/Real Brasileiro'
      ]
    };
  },
  methods: {
    async fetchCurrencyData() {
      if (this.selectedCurrency && this.secondSelectedCurrency) {
        const apiUrl = `https://economia.awesomeapi.com.br/json/${this.selectedCurrency}-${this.secondSelectedCurrency}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          this.currencyData = data[0];

          // message error from API
          this.messageError = data.message;
        } catch (error) {
          console.error('Erro ao buscar os dados da moeda:', error);
        }
      } else {
        this.currencyData = null;
      }
    },
    // Function to convert the currency 
    convertCurrency() {
      const inputValue = parseFloat(this.inputValue);
      const askValue = parseFloat(this.currencyData.ask);
      
      if (!isNaN(inputValue) && !isNaN(askValue)) {
        this.convertedValue = (inputValue * askValue).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } else {
        this.convertedValue = null;
      }
    }
  },
  setup() {
    const data = reactive({
      currencies: {},
    });

    onMounted(async () => {
      const response = await api.all();
      data.currencies = response.data;
    });

    return { ...toRefs(data) };
  },
};
</script>
