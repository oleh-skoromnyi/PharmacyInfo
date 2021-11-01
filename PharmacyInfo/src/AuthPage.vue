<template>
    <div class="body-content">
        <label>
            Role
        </label>
        <input v-model="Role" type="text" />
        <label>
            Id
        </label>
        <input v-model="Id" type="text" />
        <button v-on:click="check()">Login</button>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    import {
        namespacedMutations as mutations,
        namespacedGetters as getters,
    } from './store/types.js';

    export default {
        data: function () {
            return {
                Role: 'Patient',
                Id: 1
            }
        },
        computed: {
            ...mapGetters({
                role: getters.AUTH_ROLE,
                id: getters.AUTH_ID
            }),
        },
        methods: {
            ...mapMutations({
                login: mutations.AUTH_LOGIN
            }),
            check: function () {
                this.login({ role: this.Role, id: this.Id });
                window.location.replace(window.location.origin+'/Medications.html');
            }
        }

    }
</script>

