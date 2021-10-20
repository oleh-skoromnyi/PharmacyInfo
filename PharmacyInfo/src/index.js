import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import storeDefinition from './store/store.js';

import PatientsPage from "./PharmacyInfoPatientsPage.vue";
import PharmaciesPage from "./PharmacyInfoPharmaciesPage.vue";
const store = new Vuex.Store(storeDefinition);

new Vue({
    store: store,
    el: '#PatientsPage',
    components: {
        PatientsPage
    },
    render: h => h(PatientsPage)
})

new Vue({
    store: store,
    el: '#PharmaciesPage',
    components: {
        PharmaciesPage
    },
    render: h => h(PharmaciesPage)
})
