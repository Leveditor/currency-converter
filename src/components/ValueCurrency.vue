<template>
  <div class="overflow-x-auto md:overflow-x-hidden border shadow-2xl rounded-lg">
    <div class="min-w-full">
      <table>
        <thead>
          <tr class="text-gray-600">
            <th class="px-4">Bandeira</th>
            <th class="px-32">Moeda</th>
            <th class="px-12">Valor </th>
            <th class="px-12">Máxima</th>
            <th class="px-12">Mínima</th>
            <th class="py-2 px-12">Variação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in currency" :key="coin.code" class="border-b text-center">
            <template v-if="!removedCurrency.includes(coin.name)">
              <td class="py-4">
                <img :src="`https://wise.com/web-art/assets/flags/${coin.code.toLowerCase()}.svg`" class="w-10 ml-4" />
              </td>
              <td class="py-4">{{ coin.name }}</td>
              <td class="p-4 font-bold">R$ {{ Math.ceil(coin.ask * 100) / 100 }}</td>

              <td class="py-4">
                <span :class="[coin.pctChange > 0 ? 'text-red-600' : 'text-green-600', 'font-bold']">R$ {{ Math.ceil(coin.high * 100) / 100 }}</span>
              </td>

              <td class="py-4">
                <span :class="[coin.pctChange > 0 ? 'text-green-600' : 'text-red-600', 'font-bold']">R$ {{ Math.ceil(coin.low * 100) / 100 }}</span>
              </td>

              <td class="py-4">
                <span class="px-5 py-2 rounded-full" :class="[coin.pctChange < 0 ? 'bg-red-600 text-white' : 'bg-green-600 text-white']">{{ coin.pctChange }}</span>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../api/api.js';
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'CurrencyValue',
  data() {
    return {
        removedCurrency: [
            'Litecoin/Real Brasileiro',
            'Bitcoin/Real Brasileiro',
            'Ethereum/Real Brasileiro',
            'XRP/Real Brasileiro',
            'Dogecoin/Real Brasileiro'
        ]
    }
  },
    
  setup() {
    const data = reactive ({
        currency: { },
    });

    onMounted(async() => {
        const response = await api.all();
        data.currency = response.data;
    })

    return { ... toRefs(data) }
  }
};
</script>