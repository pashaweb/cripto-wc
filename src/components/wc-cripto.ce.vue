<template>
  <slot name="header">Default Text</slot>
  <CoinTracker :backround="backround" :pair="pair" :complex="complex"/>
  <div class="btnHolder">
    <button @click="change">Change</button>
    <button @click="update">Update</button>
    <button @click="select">Select</button>
    <button @click="error">Error</button>

  </div>
</template>

<script setup lang="ts">
import CoinTracker from "./coin-tracker.vue";
import type {TComplex} from "../types";
import {computed} from "vue";
import {MarketEventsEnum} from "../types";

const props = defineProps<{
  backround: string;
  pair: string;
  complex?: TComplex;
}>();

const emit = defineEmits(['market']);

const eventDispatcher = (e: MarketEventsEnum, value: any) => {
  emit("market", {type: e, data: value});
};
const backround = computed(() => props.backround);
const pair = computed(() => props.pair);
const complex = computed<TComplex | null>(() => props.complex ?? null);
function change() {
  eventDispatcher(MarketEventsEnum.CHANGE, 1);
}
function update() {
  eventDispatcher(MarketEventsEnum.UPDATE, "update");
}
function select() {
  eventDispatcher(MarketEventsEnum.SELECT, "select");
}
function error() {
  eventDispatcher(MarketEventsEnum.ERROR, "error");
}


</script>
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
