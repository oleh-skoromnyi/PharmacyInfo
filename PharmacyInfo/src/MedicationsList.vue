<template>
    <div class="justify-content-center content">
        <table class="table">
            <thead class="dark-cyan-background">
                <tr>
                    <th scope="col"
                        class="table-header">
                        <p class="table-item table-header">
                            Medication Name
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
                <tr v-for="medication in getMedications">
                    <td>
                        <p class="table-item">
                            {{medication.Name}}
                        </p>
                    </td>
                    <td>
                        <p class="table-item" v-for="pharmacy in medication.Pharmacies">
                            {{pharmacy.PharmacyName+';'}}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import {
        namespacedActions as actions,
        namespacedGetters as getters,
    } from './store/types.js';

    export default {
        created: async function () {
            this.initialization();
        },
        methods: {
            ...mapActions({
                initialization: actions.INITIALIZATION
            })
        },
        computed:
        {
            ...mapGetters({
                getMedications: getters.MEDICATIONS
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