﻿import {
    getters as $G,
    mutations as $M,
    actions as $A,
    namespacedGetters as $NG
} from './types.js';

import Page from './page.js';
import axios from 'axios';

function findIndex(array, value, name) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i][name] === value) {
            return i;
        }
    }
    return -1;
}

const state = {
    pharmacies: undefined
}

const PHARMACY_ID_PROPERTY_NAME = 'Id';
const RELATED_PATIENT_ID_PROPERTY_NAME = 'PatientId';

export const getters = {
    [$G.PHARMACIES](state) {

        return state.pharmacies || [];
    },
    [$G.PHARMACIES_COUNT](state,getters) {
        if (state.pharmacies) {
            return getters[$G.PHARMACIES].length;
        }
        else {
            return 0;
        }
    },
    [$G.PHARMACIES_PAGE_COUNT](state,getters) {
        return Math.floor(getters[$G.PHARMACIES_COUNT] / getters[$NG.PAGE_PAGE_SIZE]);
    },
    [$G.PHARMACIES_AT_CURRENT_PAGE](state, getters) {
        return getters[$G.PHARMACIES].slice(getters[$NG.PAGE_ITEMS_FROM], getters[$NG.PAGE_ITEMS_TO]);
    },
    [$G.PHARMACY_INDEX]: (state) => (PharmacyId) => {
        return findIndex(state.pharmacies, PharmacyId, PHARMACY_ID_PROPERTY_NAME);
    },
    [$G.PHARMACY_RELATED_PATIENT_INDEX]: (state, getters) => (PharmacyId, PatientId) => {
        return findIndex(state.pharmacies[getters[$G.PHARMACY_INDEX](PharmacyId)].Patients, PatientId, RELATED_PATIENT_ID_PROPERTY_NAME);
    },
    [$G.GET_PHARMACY_BY_ID]: (state, getters) => (PharmacyId) => {
        return state.pharmacies[getters[$G.PHARMACY_INDEX](PharmacyId)];
    }
}

export const mutations = {
    [$M.PHARMACY_ADD_PATIENT](state, payload) {
        state.pharmacies[payload.pharmacyIndex].Patients.push(payload.patient);
    },
    [$M.PHARMACY_REMOVE_PATIENT](state, payload) {
        state.pharmacies[payload.pharmacyIndex].Patients.splice(payload.patientIndex, 1);
    },
    [$M.LOAD_PHARMACIES_TO_STORE](state, payload) {
        state.pharmacies = payload.pharmacies;
    },
}

export const actions = {
    [$A.LOAD_PHARMACIES_FROM_DB_TO_STORE]: async function (context) {
        var data = sessionStorage.getItem('pharmacies');
        if (!data) {
            data = await (new PharmacyService()).getPharmacies();
            sessionStorage.setItem('pharmacies', JSON.stringify(data));
        }
        else {
            data = JSON.parse(data);
        }
        context.commit($M.LOAD_PHARMACIES_TO_STORE, { pharmacies: data });
    }
}

const GET_PHARMACIES_ACTION_PATH = '/Home/GetPharmacies';

class PharmacyService{
    async getPharmacies() {
        return await axios.get(GET_PHARMACIES_ACTION_PATH).then((response) => response.data);
    }
}

export default new PharmacyService();

export const Pharmacies = {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        Page
    }
}