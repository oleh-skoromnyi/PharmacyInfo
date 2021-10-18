import Vue from 'vue';

export default {
    changeItemsType(state, payload) {
        state.itemType = payload;
    },
    changeItem(state, payload) {
        if (payload.differentIndex > -1) {
            state.items[payload.itemType][payload.index][payload.propertyType].splice(payload.differentIndex,1);
        }
        else {
            state.items[payload.itemType][payload.index][payload.propertyType].push(payload.item);
        }
    },
    loadItems(state, payload) {
        Vue.set(state.items, payload.itemType, payload.items);
    },
    setNumberMonthToFilter(state, payload) {
        state.numberOfMonthToFilter = payload;
    }
}