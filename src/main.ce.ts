import { defineCustomElement } from 'vue'
import VueCoinTracker from './components/wc-cripto.ce.vue';

const CoinTracker = defineCustomElement(VueCoinTracker)

customElements.define('coin-tracker',  CoinTracker)