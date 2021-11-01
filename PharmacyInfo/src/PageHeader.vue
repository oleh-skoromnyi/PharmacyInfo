<template>
    <header>
        <nav class="navbar navbar-expand-lg scrolling-navbar">
            <a class="navbar-brand" href="../Medications.html">Pharmacy Info</a>
            <div class="nav-item" v-if="role === 'Pharmacy'">
                <a class="nav-link" href="../Patients.html">Patients</a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="../Pharmacies.html">Pharmacies</a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="../Medications.html">Medications</a>
            </div>
            <button v-on:click="logoutAndGoToAuthPage()">
                Log out
            </button>
        </nav>
    </header>
</template>


<script>
    import { mapMutations, mapGetters } from 'vuex';
    import {
        namespacedMutations as mutations,
        namespacedGetters as getters,
    } from './store/types.js';

    export default {
        methods: {
            ...mapMutations({
                logout: mutations.AUTH_LOGOUT
            }),
            logoutAndGoToAuthPage: function () {
                this.logout();
                window.location.replace(window.location.origin + '/Auth.html');
            }
        },
        computed: {
            ...mapGetters({
                role: getters.AUTH_ROLE,
            })
        }
    }
</script>

<style scoped>
    .navbar-brand, .nav-link {
        text-decoration: none;
        color: antiquewhite;
        margin-left: 15px;
    }

    .navbar {
        background-color: darkslategray;
        justify-content: left;
    }

    .sticky-header {
        position: sticky;
        top: 0;
    }
</style>