import {
    getters as $G,
    mutations as $M,
    actions as $A
} from './types';

import {
    getters as $NG,
    mutations as $NM,
    actions as $NA
} from './namespacedTypes';

import Page from './page.js';
import axios from 'axios';

function filterPatientByMonth(patient, numberOfMonthToFilter) {
    var patientDate = new Date(new Date(patient.PharmacyAssignDate).setDate(1));
    var currentDate = new Date(new Date().setDate(1));
    if (currentDate.getMonth() + 1 > numberOfMonthToFilter) {
        var filteredDate = new Date(currentDate.getFullYear(), +currentDate.getMonth() - numberOfMonthToFilter);
    }
    else {
        var filteredDate = new Date(currentDate.getFullYear() - 1, +currentDate.getMonth() + 12 - numberOfMonthToFilter);
    }
    return patientDate.getTime() > filteredDate.getTime();
};

function findIndex(array, value, name) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i][name] === value) {
            return i;
        }
    }
    return -1;
}

const state = {
    patients: undefined,
    numberOfMonthToFilter: 0
}

const PATIENT_ID_PROPERTY_NAME = 'Id';
const RELATED_PHARMACY_ID_PROPERTY_NAME = 'PharmacyId';
const GET_PATIENTS_ACTION_PATH = '/Home/GetPatients';

export const getters = {
    [$G.FILTERED_PATIENTS](state) {
        if (state.numberOfMonthToFilter === 0) {
            return state.patients || [];
        }
        else {
            return state.patients.filter(patient => filterPatientByMonth(patient, state.numberOfMonthToFilter)) || [];
        }
    },
    [$G.PATIENTS_COUNT](state,getters) {
        if (state.patients) {
            return getters[$G.FILTERED_PATIENTS].length;
        }
        else {
            return 0;
        }
    },

    [$G.PATIENTS_PAGE_COUNT](state, getters) {
        return Math.floor(getters[$G.PATIENTS_COUNT] / getters[$NG.PAGE_PAGE_SIZE]);
    },
    [$G.PATIENTS_AT_CURRENT_PAGE](state, getters) {
        return getters[$G.FILTERED_PATIENTS].slice(getters[$NG.PAGE_ITEMS_FROM], getters[$NG.PAGE_ITEMS_TO]);
    },
    [$G.IS_PATIENT_ASSIGNED_TO_PHARMACY]: (state, getters) => (PatientId, PharmacyId) => {
        return getters[$G.PATIENT_RELATED_PHARMACY_INDEX](PatientId, PharmacyId) !== -1
    },
    [$G.PATIENT_INDEX]: (state) => (PatientId) => {
        return findIndex(state.patients, PatientId, PATIENT_ID_PROPERTY_NAME);
    },
    [$G.PATIENT_RELATED_PHARMACY_INDEX]: (state, getters) => (PatientId, PharmacyId) => {
        return findIndex(state.patients[getters[$G.PATIENT_INDEX](PatientId)].Pharmacies, PharmacyId, RELATED_PHARMACY_ID_PROPERTY_NAME);
    },
    [$G.GET_PATIENT_BY_ID]: (state, getters) => (PatientId) => {
        return state.patients[getters[$G.PATIENT_INDEX](PatientId)];
    }
}

export const mutations = {
    [$M.PATIENT_ADD_PHARMACY](state, payload) {
        state.patients[payload.patientIndex].Pharmacies.push(payload.pharmacy);
    },
    [$M.PATIENT_REMOVE_PHARMACY](state, payload) {
        state.patients[payload.patientIndex].Pharmacies.splice(payload.pharmacyIndex, 1);
    },
    [$M.LOAD_PATIENTS_TO_STORE](state, payload) {
        state.patients = payload;
    },
    [$M.SET_NUMBER_OF_MONTH_TO_FILTER](state, payload) {
        state.numberOfMonthToFilter = payload;
    },
    
}

export const actions = {
    [$A.LOAD_PATIENTS_FROM_DB_TO_STORE]: async function (context) {
        var data = sessionStorage.getItem('patients');
        if (!data) {
            await axios.get(GET_PATIENTS_ACTION_PATH).then(function (response) {
                data = response.data;
            });

            data.forEach(function (patient) {
                var date = new Date(+patient.PharmacyAssignDate.substring(6, patient.PharmacyAssignDate.length - 2));
                patient = patient.PharmacyAssignDate = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
            });

            sessionStorage.setItem('patients', JSON.stringify(data));
        }
        else {
            data = JSON.parse(data);
        }
        context.commit($M.LOAD_PATIENTS_TO_STORE, data);

    },
    [$A.CHANGE_NUMBER_OF_MONTH_TO_FILTER](context, payload){
        context.commit($M.SET_NUMBER_OF_MONTH_TO_FILTER, payload);
        context.commit($NM.PAGE_RESET_PAGE);
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        Page
    }
}