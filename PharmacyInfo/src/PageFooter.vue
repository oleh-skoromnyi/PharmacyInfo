<template>
    <footer class="page-footer flex special-color-dark pt-4">
        &copy; Pharmacy Info {{currentYear}}
    </footer>
</template>

<script>
    export default {
        data: function () {
            return {
                currentYear: new Date().getFullYear()
            }
        }
    }
</script>

<style scoped>
    .special-color-dark {
        background-color: darkslategrey;
        color: antiquewhite;
    }

    .page-footer {
        margin: 0px;
        padding: 15px;
        min-width: 100vw;
        min-width: max-content;
    }
</style>