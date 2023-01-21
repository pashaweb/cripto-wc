import { defineCustomElement } from 'vue'
import VueCoinTracker from './components/coin-tracker.ce.vue';

const CoinTracker = defineCustomElement(VueCoinTracker)

customElements.define('coin-tracker',  CoinTracker)