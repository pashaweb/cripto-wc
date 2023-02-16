<script setup lang="ts">

import { reactive, ref, toRefs } from 'vue';
import ArrowCheck from './arrow-check.vue';
const props = defineProps<{
    coin:{
        name: string;
        money: number;
        formated: string;
    }
}>();

const {coin} = toRefs(props);
</script>

<template>

        <div :key="coin.formated">
            <div class="inner" >
                <div>{{coin.name}}</div>
                <div class="val-and-arrow">
                    <div>{{coin.formated}}</div>
                    <ArrowCheck :amount="coin.money ?? 0" :name="coin.name ?? null" />
                </div>
                
                                
            </div>
        </div>

   
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>