import pageModule from './storePageModule.js';
import getters from './storeGetters.js';
import mutations from './storeMutations.js';
import actions from './storeActions.js';

export default {
    state: {
        items: {},
        itemType: 'Patients',
        numberOfMonthToFilter: 0
    },
    modules: {
        pageModule: pageModule
    },
    mutations: mutations,
    getters: getters,
    actions: actions,
}