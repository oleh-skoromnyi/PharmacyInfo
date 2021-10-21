import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';
Vue.use(Vuex);

import storeDefinition from './store/store.js';

import PatientsPage from "./PharmacyInfoPatientsPage.vue";
import PharmaciesPage from "./PharmacyInfoPharmaciesPage.vue";
const store = new Vuex.Store(storeDefinition);

if ($('#PatientsPage').length) {
    new Vue({
        store: store,
        el: '#PatientsPage',
        components: {
            PatientsPage
        },
        render: h => h(PatientsPage)
    })
}
if ($('#PharmaciesPage').length) {
    new Vue({
        store: store,
        el: '#PharmaciesPage',
        components: {
            PharmaciesPage
        },
        render: h => h(PharmaciesPage)
    })
}
