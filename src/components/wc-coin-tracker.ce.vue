<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import CoinCheck from './coin-check.vue';
import type {TComplex} from "../types";

const props = defineProps<{
  pair: string;
  backround: string;
  complex?: {
    color: string;
    padding: string;
    borderRadius: string;
    border: string;
    margin: string;
    display: string;
    flexDirection: string;
    justifyContent: string;
    alignItems: string;
  };
}>();

const complex = computed<TComplex | null>(() => props.complex ?? null);


const apiUrl = 'https://api.coinbase.com/v2/prices';
const date = ref(new Date());
const btcPair = 'BTC-USD';
const ethPair = 'ETH-USD';
const pass = reactive({} as any);

interface moneyFormat {
  formated: string;
  money: number;
  name: string;
}

const btc = reactive({} as moneyFormat);
const eth = reactive({} as moneyFormat);

async function getCoinPrice(pair: string): Promise<moneyFormat> {
  const response = await fetch(`${apiUrl}/${pair}/spot`);
  const res = await response.json();
  return {
    money: parseFloat(res.data.amount),
    formated: Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(res.data.amount),
    name: pair.split('-')[0]
  };
}

async function setCoins() {
  const btcValue: moneyFormat = await getCoinPrice(btcPair);
  const ethValue: moneyFormat = await getCoinPrice(ethPair);
  console.log(btcValue, ethValue);
  btc.formated = btcValue.formated;
  btc.money = btcValue.money;
  btc.name = btcValue.name;
  eth.formated = ethValue.formated;
  eth.money = ethValue.money;
  eth.name = ethValue.name;
  date.value = new Date();
  if (props.pair) {
    const pairValue: moneyFormat = await getCoinPrice(props.pair);
    pass.formated = pairValue.formated;
    pass.money = pairValue.money;
    pass.name = pairValue.name;
  }

}

setCoins();
setInterval(setCoins, 5000);
</script>
<template>
  <slot name="header">Blalalal</slot>
  <section>
    <coin-check :coin="btc"/>
    <coin-check :coin="eth"/>
    <coin-check v-if="pair" :coin="pass"/>
  </section>
  <div class="sub">
    Last Update: <span>{{ date }}</span>
  </div>
  <div>{{ JSON.stringify(complex) }}</div>
  <slot name="footer"></slot>
</template>

<style>
.sub {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 2.5rem;
  margin: 0 auto;
  gap: 1rem;
}

section > div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 0.5rem;
  width: 20%;
  background-color: v-bind(backround);

}

.inner {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.val-and-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  font-size: 1rem;
}

svg {
  width: 30px;
}

.up {
  fill: green;
}

.down {
  fill: red;
}

.price-info {
  display: flex;
  gap: 1.2rem;
}
</style>