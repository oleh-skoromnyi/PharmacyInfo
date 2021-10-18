import axios from 'axios';

async function getData(context, currentAction) {
    var result;
    await axios.get('/Home/' + currentAction).then(function (response) {
        console.log(response);
        result = response.data;
    });
    if (currentAction === 'Patients') {
        result.forEach(function (patient) {
            var date = new Date(+patient.PharmacyAssignDate.substring(6, patient.PharmacyAssignDate.length - 2));
            patient = patient.PharmacyAssignDate = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
        });
    }
    context.commit('loadItems', { items: result, itemType: currentAction });
}

async function updateData(context) {
    await axios.post('/Home/PutPatients', context.state.items['Patients']);
    await axios.post('/Home/PutPharmacies', context.state.items['Pharmacies']);
}

function findIndex(array, value, name) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i][name] === value) {
            return i;
        }
    }
    return -1;
}

export default {
    changePatientPharmacies: async function (context, payload) {
        var patientIndex = findIndex(context.state.items['Patients'], payload.patientId, 'Id');
        var pharmacyIndex = findIndex(context.state.items['Pharmacies'], payload.pharmacyId, 'Id');
        var relatedPharmacyIndex = findIndex(context.state.items['Patients'][patientIndex].Pharmacies, payload.pharmacyId, 'PharmacyId');

        if (relatedPharmacyIndex > -1) {
            var relatedPatientIndex = findIndex(context.state.items['Pharmacies'][pharmacyIndex].Patients, payload.patientId, 'PatientId');

            context.commit('changeItem',
                {
                    itemType: 'Patients',
                    index: patientIndex,
                    differentIndex: relatedPharmacyIndex,
                    propertyType: 'Pharmacies'
                });

            context.commit('changeItem',
                {
                    itemType: 'Pharmacies',
                    index: pharmacyIndex,
                    differentIndex: relatedPatientIndex,
                    propertyType: 'Patients'
                });
        }
        else {
            var patient = context.state.items['Patients'][patientIndex];
            var pharmacy = context.state.items['Pharmacies'][pharmacyIndex];

            var Patient = {
                FirstName: patient.FirstName,
                LastName: patient.LastName,
                PatientId: payload.patientId
            };
            var Pharmacy = {
                PharmacyId: payload.pharmacyId,
                PharmacyName: pharmacy.PharmacyName
            };
            context.commit('changeItem',
                {
                    itemType: 'Patients',
                    index: patientIndex,
                    differentIndex: -1,
                    item: Pharmacy,
                    propertyType: 'Pharmacies'
                });

            context.commit('changeItem',
                {
                    itemType: 'Pharmacies',
                    index: pharmacyIndex,
                    differentIndex: -1,
                    item: Patient,
                    propertyType: 'Patients'
                });
        }
        await updateData(context);
    },
    getDataFromSource: async function (context) {
        await getData(context, 'Pharmacies');
        await getData(context, 'Patients');
        context.commit('changeItemsType', 'Patients');
    },
    resetPage(context, payload) {
        context.commit('pageModule/resetPage');
        context.commit('setNumberMonthToFilter', payload);
    },
    changeItemsType(context, payload) {
        console.log(payload);
        context.commit('pageModule/resetPage');
        context.commit('changeItemsType', payload);
    },
}