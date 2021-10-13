import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';

import PharmacyInfoPage from './PharmacyInfoPage.vue';

new Vue({
    el: '#pharmacyInfoPage',
    render: h => h(PharmacyInfoPage),
})
