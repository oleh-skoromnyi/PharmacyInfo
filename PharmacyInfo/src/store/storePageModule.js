export default {
    namespaced: true,
    state: {
        page: 0
    },
    mutations: {
        nextPage(state) {
            state.page += 1;
        },
        previousPage(state) {
            state.page -= 1;
        },
        resetPage(state) {
            state.page = 0;
        }
    }
}