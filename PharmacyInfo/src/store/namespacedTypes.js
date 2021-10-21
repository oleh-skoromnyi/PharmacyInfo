﻿export const getters = {
    //PATIENTS
    FILTERED_PATIENTS: 'Patients/FILTERED_PATIENTS',
    NUMBER_OF_PATIENTS: 'Patients/NUMBER_OF_PATIENTS',
    PATIENTS_AT_CURRENT_PAGE: 'Patients/PATIENTS_AT_CURRENT_PAGE',
    IS_PATIENT_ASSIGNED_TO_PHARMACY: 'Patients/IS_PATIENT_ASSIGNED_TO_PHARMACY',
    GET_PATIENTS_PAGE_COUNT: 'Patients/GET_PATIENTS_PAGE_COUNT',
    PATIENT_INDEX: 'Patients/PATIENT_INDEX',
    RELATED_TO_PATIENT_PHARMACY_INDEX: 'Patients/RELATED_TO_PATIENT_PHARMACY_INDEX',
    GET_PATIENT_BY_ID: 'Patients/GET_PATIENT_BY_ID',

    //PHARMACIES
    PHARMACIES: 'Pharmacies/PHARMACIES',
    NUMBER_OF_PHARMACIES: 'Pharmacies/NUMBER_OF_PHARMACIES',
    PHARMACIES_AT_CURRENT_PAGE: 'Pharmacies/PHARMACIES_AT_CURRENT_PAGE',
    GET_PHARMACIES_PAGE_COUNT: 'Pharmacies/GET_PHARMACIES_PAGE_COUNT',
    PHARMACY_INDEX: 'Pharmacies/PHARMACY_INDEX',
    RELATED_TO_PHARMACY_PATIENT_INDEX: 'Pharmacies/RELATED_TO_PHARMACY_PATIENT_INDEX',
    GET_PHARMACY_BY_ID: 'Pharmacies/GET_PHARMACY_BY_ID',

    //PATIENTS PAGE
    PATIENTS_ITEMS_FROM: 'Patients/Page/ITEMS_FROM',
    PATIENTS_ITEMS_TO: 'Patients/Page/ITEMS_TO',
    PATIENTS_PAGE_SIZE: 'Patients/Page/PAGE_SIZE',

    //PHARMACIES PAGE
    PHARMACIES_ITEMS_FROM: 'Pharmacies/Page/ITEMS_FROM',
    PHARMACIES_ITEMS_TO: 'Pharmacies/Page/ITEMS_TO',
    PHARMACIES_PAGE_SIZE: 'Pharmacies/Page/PAGE_SIZE',

    //PATIENTS PAGE
    PATIENTS_PAGE_ITEMS_FROM: 'Page/ITEMS_FROM',
    PATIENTS_PAGE_ITEMS_TO: 'Page/ITEMS_TO',
    PATIENTS_PAGE_PAGE_SIZE: 'Page/PAGE_SIZE',

    //PHARMACIES PAGE
    PHARMACIES_PAGE_ITEMS_FROM: 'Page/ITEMS_FROM',
    PHARMACIES_PAGE_ITEMS_TO: 'Page/ITEMS_TO',
    PHARMACIES_PAGE_PAGE_SIZE: 'Page/PAGE_SIZE',
}

export const mutations = {
    //PATIENTS
    PATIENT_ADD_PHARMACY: 'Patients/PATIENT_ADD_PHARMACY',
    PATIENT_REMOVE_PHARMACY: 'Patients/PATIENT_REMOVE_PHARMACY',
    LOAD_PATIENTS_TO_STORE: 'Patients/LOAD_PATIENTS_TO_STORE',
    SET_NUMBER_OF_MONTH_TO_FILTER: 'Patients/SET_NUMBER_OF_MONTH_TO_FILTER',
    IS_PATIENT_ASSIGNED_TO_PHARMACY: 'Patients/IS_PATIENT_ASSIGNED_TO_PHARMACY',
    PATIENT_INDEX: 'Patients/PATIENT_INDEX',
    RELATED_PHARMACY_INDEX: 'Patients/RELATED_PHARMACY_INDEX',

    //PHARMACIES
    LOAD_PHARMACIES_TO_STORE: 'Pharmacies/LOAD_PHARMACIES_TO_STORE',
    PHARMACY_ADD_PATIENT: 'Pharmacies/PHARMACY_ADD_PATIENT',
    PHARMACY_REMOVE_PATIENT: 'Pharmacies/PHARMACY_REMOVE_PATIENT',

    //PATIENTS PAGE
    PATIENTS_NEXT_PAGE: 'Patients/Page/NEXT_PAGE',
    PATIENTS_PREVIOUS_PAGE: 'Patients/Page/PREVIOUS_PAGE',
    PATIENTS_RESET_PAGE: 'Patients/Page/RESET_PAGE',
    PATIENTS_CHANGE_SIZE: 'Patients/Page/CHANGE_SIZE',
    PATIENTS_PAGE_RESET_PAGE: 'Page/RESET_PAGE',

    //PHARMACIES PAGE
    PHARMACIES_NEXT_PAGE: 'Pharmacies/Page/NEXT_PAGE',
    PHARMACIES_PREVIOUS_PAGE: 'Pharmacies/Page/PREVIOUS_PAGE',
    PHARMACIES_RESET_PAGE: 'Pharmacies/Page/RESET_PAGE',
    PHARMACIES_CHANGE_SIZE: 'Pharmacies/Page/CHANGE_SIZE',
    PHARMACIES_PAGE_RESET_PAGE: 'Page/RESET_PAGE',
}

export const actions = {
    //PATIENTS
    LOAD_PATIENTS_FROM_DB_TO_STORE: 'Patients/LOAD_PATIENTS_FROM_DB_TO_STORE',
    CHANGE_NUMBER_OF_MONTH_TO_FILTER: 'Patients/CHANGE_NUMBER_OF_MONTH_TO_FILTER',

    //PHARMACIES
    LOAD_PHARMACIES_FROM_DB_TO_STORE: 'Pharmacies/LOAD_PHARMACIES_FROM_DB_TO_STORE',

    //STORE
    ASSIGN_PATIENT_TO_PHARMACY: 'ASSIGN_PATIENT_TO_PHARMACY',
    INITIALIZATION: 'INITIALIZATION',
}
