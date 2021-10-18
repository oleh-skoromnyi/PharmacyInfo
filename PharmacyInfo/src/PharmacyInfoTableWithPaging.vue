<template>
    <div class="justify-content-center content">
        <div class="form-check form-check-inline flex filter dark-cyan-background"
             v-if="itemType === 'Patients'">
            <span>Filter date: </span>

            <input type="radio"
                   id="zeroMonthToFilter"
                   value='0'
                   v-on:click="resetPage(0)"
                   v-bind:checked="numberOfMonthToFilter === 0">
            <span>No</span>

            <input type="radio"
                   id="oneMonthToFilter"
                   value='1'
                   v-on:click="resetPage(1)"
                   v-bind:checked="numberOfMonthToFilter === 1">
            <span>One month</span>

            <input type="radio"
                   id="threeMonthesToFilter"
                   value='3'
                   v-on:click="resetPage(3)"
                   v-bind:checked="numberOfMonthToFilter === 3">
            <span>Three months</span>
        </div>
        <table class="table">
            <thead class="dark-cyan-background">
                <tr>
                    <th scope="col"
                        class="table-header"
                        v-for="(value, name) in getPagging[0]">
                        <p class="table-item table-header" 
                           v-if="name !== 'PharmacyId' && name !== 'Id'">
                            {{name}}
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getPagging">
                    <td v-for="(value, name) in item">
                        <p class="table-item"
                           v-if="name !== 'PharmacyId' && name !== 'Patients' && name !== 'Pharmacies' && name !== 'Id'">
                            {{value}}
                        </p>
                        <div class="dropdown"
                             v-if="name === 'Pharmacies'">
                            <button class="btn btn-info dropdown-button"
                                    v-on:click="showDropdown(item.Id)" type="button">
                                Pharmacies
                            </button>
                            <div class="dropdown-menu"
                                 v-bind:id='"pharmaciesDropdown"+item.Id'>
                                <div class="dropdown-item"
                                     v-for="pharmacy in getPharmacies">
                                    <input type="checkbox"
                                           v-on:change="changePatientPharmacies({patientId:item.Id,pharmacyId:pharmacy.Id})"
                                           class="dropdown-item-checkbox" value="pharmacy.Id"
                                           v-bind:checked="value.filter(e => e.PharmacyId === pharmacy.Id).length > 0">
                                    {{pharmacy.PharmacyName}}
                                </div>
                            </div>
                        </div>
                        <div v-if="name === 'Patients'">
                            <p class="table-item"
                               v-for="patient in value">
                                {{patient.FirstName +' '+ patient.LastName+'; '}}
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex page-buttons-panel">
            <button class="btn btn-light" 
                    v-on:click="previousPage()" 
                    v-bind:disabled="page <= 0">PreviousPage</button>
            <label class="page-number">{{page+1}}</label>
            <button class="btn btn-light" 
                    v-on:click="nextPage()" 
                    v-bind:disabled="page >= getPageCount">NextPage</button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

    window.$ = require('jquery');

    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-item') && !event.target.matches('.dropdown-button') && !event.target.matches('.dropdown-item-checkbox')) {
            $(".dropdown-menu").removeClass("show");
        }
    }

    export default {
        created: async function () {
            this.getDataFromSource();
        },
        methods: {
            ...mapMutations({
                nextPage: 'pageModule/nextPage',
                previousPage: 'pageModule/previousPage',
                changeItem: 'changeItem'
            }),
            ...mapActions({
                getDataFromSource: 'getDataFromSource',
                changePatientPharmacies: 'changePatientPharmacies',
                changeItemsType: 'changeItemsType',
                resetPage: 'resetPage'
            }),
            showDropdown(id) {
                $("#pharmaciesDropdown" + id).addClass("show");
            }
        },
        computed:
        {
            ...mapState({
                page: state => state.pageModule.page,
                items: state => state.items,
                itemType: state => state.itemType,
                numberOfMonthToFilter: state => state.numberOfMonthToFilter,
            }),
            ...mapGetters({
                getFiltered: 'getFiltered',
                getPageCount: 'getPageCount',
                getPagging: 'getPagging',
                getSorted: 'getSorted',
                getPharmacies: 'getPharmacies'
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
        min-width: 160px;
        height: 140px;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .show {
        display: block;
    }
</style>