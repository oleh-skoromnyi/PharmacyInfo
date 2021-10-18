import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import PharmacyInfoPage from './PharmacyInfoPage.vue';
import storeDefinition from './store/store.js';

const store = new Vuex.Store(storeDefinition);

new Vue({
    store: store,
    el: '#pharmacyInfoPage',
    components: {
        PharmacyInfoPage
    },
    render: h => h(PharmacyInfoPage)
})
