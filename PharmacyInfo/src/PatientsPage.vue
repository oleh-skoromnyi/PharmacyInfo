<template>
    <div class="body-content">
        <pharmacy-info-page-header></pharmacy-info-page-header>
        <pharmacy-info-patients-list></pharmacy-info-patients-list>
        <pharmacy-info-page-footer></pharmacy-info-page-footer>
    </div>
</template>

<script>
    import PharmacyInfoPageFooter from './PageFooter.vue';
    import PharmacyInfoPageHeader from './PageHeader.vue';
    import PharmacyInfoPatientsList from './PatientsList.vue';

    export default {
        components: {
            PharmacyInfoPageFooter,
            PharmacyInfoPageHeader,
            PharmacyInfoPatientsList
        }
    }
</script>

