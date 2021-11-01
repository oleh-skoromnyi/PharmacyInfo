import {
    getters as $G,
    mutations as $M
} from './types.js';

const state = {
    id: 0,
    role: undefined
}

export const getters = {
    [$G.AUTH_ROLE](state) {
        return state.role;
    },
    [$G.AUTH_ID](state) {
        return state.id;
    },
}

export const mutations = {
    [$M.AUTH_LOGIN](state, payload) {
        state.id = payload.id;
        state.role = payload.role;
        sessionStorage.setItem('auth', JSON.stringify(state));
    },
    [$M.AUTH_LOGOUT](state) {
        state.id = 0;
        state.role = undefined;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}