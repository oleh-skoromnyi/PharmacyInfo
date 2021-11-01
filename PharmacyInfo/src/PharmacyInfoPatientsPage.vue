<template>
    <div class="body-content">
        <pharmacy-info-page-header></pharmacy-info-page-header>
        <pharmacy-info-patients-list></pharmacy-info-patients-list>
        <pharmacy-info-page-footer></pharmacy-info-page-footer>
    </div>
</template>

<script>
    import PharmacyInfoPageFooter from './PharmacyInfoPageFooter.vue';
    import PharmacyInfoPageHeader from './PharmacyInfoPageHeader.vue';
    import PharmacyInfoPatientsList from './PharmacyInfoPatientsList.vue';

    export default {
        components: {
            PharmacyInfoPageFooter,
            PharmacyInfoPageHeader,
            PharmacyInfoPatientsList
        }
    }
</script>

