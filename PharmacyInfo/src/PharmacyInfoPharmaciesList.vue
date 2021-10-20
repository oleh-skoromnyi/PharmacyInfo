<template>
    <div class="justify-content-center content">
        <table class="table">
            <thead class="dark-cyan-background">
                <tr>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Pharmacy name
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Phone number
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            State code
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Zip code
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Street address
                        </p>
                    </th>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Patients
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pharmacy in getPharmacies">
                    <td>
                        <p class="table-item">
                            {{pharmacy.PharmacyName}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item">
                            {{pharmacy.PhoneNumber}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item">
                            {{pharmacy.StateCode}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item">
                            {{pharmacy.ZipCode}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item">
                            {{pharmacy.StreetAddress}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item" v-for="patient in pharmacy.Patients">
                            {{patient.FirstName+' '+patient.LastName+';'}}
                        </p>
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
                initialization: actions.INITIALIZATION
            }),
            showDropdown(id) {
                $("#pharmaciesDropdown" + id).addClass("show");
            }
        },
        computed:
        {
            ...mapState({
                page: state => state.Pharmacies.Page.page
            }),
            ...mapGetters({
                getPageCount: getters.GET_PHARMACIES_PAGE_COUNT,
                getPharmacies: getters.PHARMACIES_AT_CURRENT_PAGE,
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

    .content {
        flex: 2 0 auto;
        margin-block-end: 10px;
    }
</style>