<template>
    <header>
        <nav class="navbar navbar-expand-lg scrolling-navbar">
            <a class="navbar-brand" v-on:click="changeItemsType('Patients')" href="#">Pharmacy Info</a>
            <div class="nav-item">
                <a class="nav-link" v-on:click="changeItemsType('Patients')" href="#">Patients</a>
            </div>
            <div class="nav-item">
                <a class="nav-link" v-on:click="changeItemsType('Pharmacies')" href="#">Pharmacies</a>
            </div>
        </nav>
    </header>
</template>


<script>
    import { mapActions, mapState} from 'vuex'

    export default {
        methods: {
            ...mapActions({
                changeItemsType: 'changeItemsType',
            })
        },
        computed:
        {
            ...mapState({
                itemType: state => state.itemType
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