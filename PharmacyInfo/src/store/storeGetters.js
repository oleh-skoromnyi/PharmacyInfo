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

export default {
    getFiltered: (state, getters) => {
        console.log(state.items);
        if (state.numberOfMonthToFilter === 0 || state.itemType !== 'Patients') {
            return state.items[state.itemType];
        }
        else {
            return state.items[state.itemType].filter(patient => filterPatientByMonth(patient, state.numberOfMonthToFilter));
        }
    },
    getItemCount: (state, getters) => {
        if (getters.getFiltered === undefined) {
            return 0;
        }
        return getters.getFiltered.length;
    },
    getPageCount: (state, getters) => {
        return Math.floor(getters.getItemCount / 10);
    },
    getPagging: (state, getters) => {
        if (getters.getFiltered === undefined) {
            return [];
        }
        if (state.page > getters.getItemCount / 10) {
            return getters.getFiltered.slice(0);
        }
        else {
            return getters.getFiltered.slice(state.pageModule.page * 10, (state.pageModule.page + 1) * 10);
        }
    },
    getPharmacies: (state, getters) => {
        return state.items['Pharmacies'];
    },
    getSorted: (state, getters) => {
        return getters.getFiltered.sort();
    }
}