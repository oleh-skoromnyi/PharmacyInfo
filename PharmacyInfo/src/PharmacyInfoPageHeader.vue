<template>
    <header>
        <nav class="navbar navbar-expand-lg scrolling-navbar">
            <a class="navbar-brand" href="../Patients.html">Pharmacy Info</a>
            <div class="nav-item">
                <a class="nav-link" href="../Patients.html">Patients</a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="../Pharmacies.html">Pharmacies</a>
            </div>
        </nav>
    </header>
</template>


<script>
    export default {}
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