import "./index.css";
import "bootstrap";

import Vue from 'vue';
import PatientList from './PatientList.vue';
import PharmacyList from './PharmacyList.vue';

new Vue({
    el: '#patientListApp',
    render: h => h(PatientList),
});
new Vue({
    el: '#pharmacyListApp',
    render: h => h(PharmacyList),
});