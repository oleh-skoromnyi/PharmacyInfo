import {
    getters as $G,
    mutations as $M,
    actions as $A,
    namespacedGetters as $NG,
    namespacedMutations as $NM
} from './types.js';

import axios from 'axios';

const state = {
    medications: undefined
}

const GET_MEDICATIONS_ACTION_PATH = '/Home/GetMedications';

export const getters = {
    [$G.MEDICATIONS](state) {
        return state.medications || [];
    },
}

export const mutations = {
    [$M.LOAD_MEDICATIONS_TO_STORE](state, payload) {
        state.medications = payload;
    },
}

export const actions = {
    [$A.LOAD_MEDICATIONS_FROM_DB_TO_STORE]: async function (context) {
        var data = sessionStorage.getItem('medications');
        if (!data) {
            data = await (new MedicationService()).getMedications();
            sessionStorage.setItem('medications', JSON.stringify(data));
        }
        else {
            data = JSON.parse(data);
        }
        context.commit($M.LOAD_MEDICATIONS_TO_STORE, data);
    }
}

class MedicationService {
    async getMedications() {
        return await axios.get(GET_MEDICATIONS_ACTION_PATH).then((response) => response.data);
    }
}

export default new MedicationService();

export const Medications = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}