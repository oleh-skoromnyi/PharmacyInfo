<template>
    <div class="justify-content-center content">
        <div class="form-check form-check-inline flex filter dark-cyan-background">
            <span>Filter date: </span>

            <input type="radio"
                   id="zeroMonthToFilter"
                   value='0'
                   v-on:click="setNumberOfMonthToFilter(0)"
                   v-bind:checked="numberOfMonthToFilter === 0">
            <span>No</span>

            <input type="radio"
                   id="oneMonthToFilter"
                   value='1'
                   v-on:click="setNumberOfMonthToFilter(1)"
                   v-bind:checked="numberOfMonthToFilter === 1">
            <span>One month</span>

            <input type="radio"
                   id="threeMonthesToFilter"
                   value='3'
                   v-on:click="setNumberOfMonthToFilter(3)"
                   v-bind:checked="numberOfMonthToFilter === 3">
            <span>Three months</span>
        </div>
        <table class="table">
            <thead class="dark-cyan-background">
                <tr>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            First name
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Last name
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Pharmacy assigned date
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Pharmacies
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getPatients">
                    <td>
                        <p class="table-item">
                            {{item.FirstName}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item">
                            {{item.LastName}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item">
                            {{item.PharmacyAssignDate}}
                        </p>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-info dropdown-button"
                                    v-on:click="showDropdown(item.Id)" type="button">
                                Pharmacies
                            </button>
                            <div class="dropdown-menu"
                                 v-bind:id='"pharmaciesDropdown"+item.Id'>
                                <div class="dropdown-item"
                                     v-for="pharmacy in getPharmacies">
                                    <input type="checkbox"
                                           v-on:change="assignPatientToPharmacy({patientId:item.Id,pharmacyId:pharmacy.Id})"
                                           class="dropdown-item-checkbox" value="pharmacy.Id"
                                           v-bind:checked="item.Pharmacies.filter(e => e.PharmacyId === pharmacy.Id).length > 0">
                                    {{pharmacy.PharmacyName}}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex page-buttons-panel">
            <button class="btn btn-light"
                    v-on:click="previousPage()"
                    v-bind:disabled="page <= 0">
                PreviousPage
            </button>
            <label class="page-number">{{page+1}}</label>
            <button class="btn btn-light"
                    v-on:click="nextPage()"
                    v-bind:disabled="page >= getPageCount">
                NextPage
            </button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import { getters, mutations, actions } from './store/namespacedTypes.js';

    window.$ = require('jquery');

    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dropdown-item')
            && !event.target.matches('.dropdown-button')
            && !event.target.matches('.dropdown-item-checkbox')) {
            $(".dropdown-menu").removeClass("show");
        }
    });

    export default {
        created: async function () {
            this.initialization();
        },
        methods: {
            ...mapMutations({
                nextPage: mutations.PATIENTS_NEXT_PAGE,
                previousPage: mutations.PATIENTS_PREVIOUS_PAGE,
                resetPage: mutations.PATIENTS_RESET_PAGE
            }),
            ...mapActions({
                assignPatientToPharmacy: actions.ASSIGN_PATIENT_TO_PHARMACY, 
                setNumberOfMonthToFilter: actions.CHANGE_NUMBER_OF_MONTH_TO_FILTER,
                initialization: actions.INITIALIZATION
            }),
            showDropdown(id) {
                $("#pharmaciesDropdown" + id).addClass("show");
            }
        },
        computed:
        {
            ...mapState({
                page: state => state.Patients.Page.page,
                patients: state => state.Patients.patients,
                numberOfMonthToFilter: state => state.Patients.numberOfMonthToFilter,
            }),
            ...mapGetters({
                getPageCount: getters.PATIENTS_PAGE_COUNT,
                getPatients: getters.PATIENTS_AT_CURRENT_PAGE,
                getPharmacies: getters.PHARMACIES,
            })
        }
    }
</script>

<style>
    .dark-cyan-background {
        color: antiquewhite;
        background-color: darkcyan;
    }

    .table-header {
        color: antiquewhite;
    }

    .form-check {
        justify-content: normal;
    }

    .page-buttons-panel {
        justify-content: center;
        align-items: center;
    }

    .page-number {
        margin: 10px;
    }

    .table-header {
        margin: 10px;
    }

    .table-item {
        margin: 5px;
        padding: 0px;
    }

    .filter {
        margin: 0;
        padding: 5px;
        width: 100%
    }

    .content {
        flex: 2 0 auto;
        margin-block-end: 10px;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 140px;
        height: 140px;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .show {
        display: block;
    }
</style>