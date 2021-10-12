<template>
    <div class="justify-content-center content">
        <div class="form-check form-check-inline flex filter dark-cyan-background" v-if="this.itemType === 'Patients'">
            <span>Filter date: </span>

            <input type="radio" id="zeroMonthToFilter" value='0' v-on:click="ResetPage" v-model="numberOfMonthToFilter">
            <span>No</span>

            <input type="radio" id="oneMonthToFilter" value='1' v-on:click="ResetPage" v-model="numberOfMonthToFilter">
            <span>One month</span>

            <input type="radio" id="threeMonthesToFilter" value='3' v-on:click="ResetPage" v-model="numberOfMonthToFilter">
            <span>Three month</span>

        </div>
        <table class="table">
            <thead class="dark-cyan-background">
                <tr>
                    <th scope="col" class="table-header" v-for="(value, name) in getPagging[0]">
                        <p v-if="name !== 'PharmacyId' && name !== 'Id'">
                            {{name}}
                        </p>
                    </th>
                </tr>
            </thead>
            <tr v-for="item in getPagging">
                <td v-for="(value, name) in item">
                    <p class="table-item" v-if="name !== 'PharmacyId' && name !== 'Id'">
                        {{value}}
                    </p>
                </td>
            </tr>
        </table>

        <div class="d-flex page-buttons-panel">
            <button class="btn btn-light" v-on:click="PreviousPage()" v-bind:disabled="this.page <= 0">PreviousPage</button>
            <label class="page-number">{{this.page+1}}</label>
            <button class="btn btn-light" v-on:click="NextPage()" v-bind:disabled="this.page >= getPageCount ">NextPage</button>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';

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
        data: function () {
            return {
                page: 0,
                items: [],
                itemType: 'Patients',
                numberOfMonthToFilter: '0'
            }
        },
        created: async function () {
            var locationPartList = window.location.pathname.split('/');
            var currentAction = locationPartList[locationPartList.length - 1].split('.')[0];
            var result;
            await axios.get('/Home/' + currentAction).then(function (response) {
                console.log(response);
                result = response.data;
            });
            this.items = result;
            this.itemType = currentAction;
            if (this.itemType === 'Patients') {
                this.items.forEach(function (patient) {
                    var date = new Date(+patient.PharmacyAssignDate.substring(6, patient.PharmacyAssignDate.length - 2));
                    patient = patient.PharmacyAssignDate = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
                });
            }
            console.log(this);
        },
        methods: {
            NextPage() {
                this.page += 1;
            },
            PreviousPage() {
                this.page -= 1;
            },
            ResetPage() {
                this.page = 0;
            },
        },
        computed:
        {
            getFiltered() {
                if (this.numberOfMonthToFilter === '0' || this.itemType !== 'Patients') {
                    return this.items;
                }
                else {
                    return this.items.filter(patient => filterPatientByMonth(patient, this.numberOfMonthToFilter));
                }
            },
            getPageCount() {
                return Math.floor(this.getFiltered.length / 10);
            },
            getPagging() {


                if (this.page > this.getFiltered.length / 10) {
                    return this.getFiltered.slice(0);
                }
                else {
                    return this.getFiltered.slice(this.page * 10, (this.page + 1) * 10);
                }
            },
            getSorted() {
                return this.getFiltered.sort();
            }
        }
    }
</script>

<style>
    .dark-cyan-background {
        color: antiquewhite;
        background-color: darkcyan;
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
        margin-block-end: 60px;
    }
</style>