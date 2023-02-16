import {defineCustomElement } from "vue";
import VueCoinTracker from './components/wc-coin-tracker.ce.vue';

export const CoinTracker = defineCustomElement(VueCoinTracker);
export function register(tagname = "coin-tracker", opts = {}) {
    customElements.define(tagname, CoinTracker, opts);
}
export default CoinTracker;
register();
alert('web component loaded');