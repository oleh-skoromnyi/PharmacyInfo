import {
    getters as $G,
    mutations as $M
} from './types.js';

const state = {
    page: 0,
    pageSize: 10
}

export const getters = {
    [$G.ITEMS_FROM](state) {
        return state.page * state.pageSize;
    },
    [$G.ITEMS_TO](state) {
        return (state.page+1) * state.pageSize;
    },
    [$G.PAGE_SIZE](state) {
        return state.pageSize || 10;
    }
}

export const mutations = {
    [$M.NEXT_PAGE](state) {
        state.page += 1;
    },
    [$M.PREVIOUS_PAGE](state) {
        state.page -= 1;
    },
    [$M.RESET_PAGE](state) {
        state.page = 0;
    },
    [$M.CHANGE_SIZE](state, payload) {
        state.pageSize = payload;
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations
}