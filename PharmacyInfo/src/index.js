import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';
Vue.use(Vuex);

import storeDefinition from './store/store.js';

import AuthPage from "./AuthPage.vue";
import PatientsPage from "./PatientsPage.vue";
import PharmaciesPage from "./PharmaciesPage.vue";
import MedicationsPage from "./MedicationsPage.vue";
const store = new Vuex.Store(storeDefinition);

if ($('#AuthPage').length) {
    new Vue({
        store: store,
        el: '#AuthPage',
        components: {
            AuthPage
        },
        render: h => h(AuthPage)
    })
}
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
if ($('#MedicationsPage').length) {
    new Vue({
        store: store,
        el: '#MedicationsPage',
        components: {
            MedicationsPage
        },
        render: h => h(MedicationsPage)
    })
}

