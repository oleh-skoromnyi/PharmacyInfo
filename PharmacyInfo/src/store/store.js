/// <reference path="namespacedtypes.js" />
/// <reference path="namespacedtypes.js" />
import Patients from './patients.js';
import Pharmacies from './pharmacies.js';
import {
    getters as $G,
    mutations as $M,
    actions as $A
} from './types.js';

import {
    actions as $NA,
    getters as $NG,
    mutations as $NM,
} from './namespacedTypes';

export default {
    modules: {
        Patients: Patients,
        Pharmacies: Pharmacies
    },
    actions: {
        [$A.ASSIGN_PATIENT_TO_PHARMACY]: async function (context, payload) {
            var patientIndex = context.getters[$NG.PATIENT_INDEX](payload.patientId);
            var pharmacyIndex = context.getters[$NG.PHARMACY_INDEX](payload.pharmacyId);

            if (context.getters[$NG.IS_PATIENT_ASSIGNED_TO_PHARMACY](payload.patientId, payload.pharmacyId)) {
                var relatedPatientIndex = context.getters[$NG.PHARMACY_RELATED_PATIENT_INDEX](payload.pharmacyId, payload.patientId);
                var relatedPharmacyIndex = context.getters[$NG.PATIENT_RELATED_PHARMACY_INDEX](payload.patientId, payload.pharmacyId);

                context.commit($NM.PATIENT_REMOVE_PHARMACY,
                    {
                        patientIndex: patientIndex,
                        pharmacyIndex: relatedPharmacyIndex
                    });

                context.commit($NM.PHARMACY_REMOVE_PATIENT,
                    {
                        patientIndex: relatedPatientIndex,
                        pharmacyIndex: pharmacyIndex
                    });
            }
            else {

                var patient = context.getters[$NG.GET_PATIENT_BY_ID](payload.patientId);
                var pharmacy = context.getters[$NG.GET_PHARMACY_BY_ID](payload.pharmacyId);

                var payloadPatient = {
                    FirstName: patient.FirstName,
                    LastName: patient.LastName,
                    PatientId: payload.patientId
                };
                var payloadPharmacy = {
                    PharmacyId: payload.pharmacyId,
                    PharmacyName: pharmacy.PharmacyName
                };
                context.commit($NM.PATIENT_ADD_PHARMACY,
                    {
                        patientIndex: patientIndex,
                        pharmacy: payloadPharmacy
                    });

                context.commit($NM.PHARMACY_ADD_PATIENT,
                    {
                        pharmacyIndex: pharmacyIndex,
                        patient: payloadPatient
                    });
            }
            sessionStorage.setItem('pharmacies', JSON.stringify(context.state.Pharmacies.pharmacies));
            sessionStorage.setItem('patients', JSON.stringify(context.state.Patients.patients));
        },
        [$A.INITIALIZATION]: async function (context) {
            await context.dispatch($NA.LOAD_PATIENTS_FROM_DB_TO_STORE);
            await context.dispatch($NA.LOAD_PHARMACIES_FROM_DB_TO_STORE);
        }
    }
}