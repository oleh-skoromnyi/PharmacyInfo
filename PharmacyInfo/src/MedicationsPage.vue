<template>
    <div class="body-content">
        <pharmacy-info-page-header></pharmacy-info-page-header>
        <pharmacy-info-medications-list></pharmacy-info-medications-list>
        <pharmacy-info-page-footer></pharmacy-info-page-footer>
    </div>
</template>

<script>
    import PharmacyInfoPageFooter from './PageFooter.vue';
    import PharmacyInfoPageHeader from './PageHeader.vue';
    import PharmacyInfoMedicationsList from './MedicationsList.vue';

    export default {
        components: {
            PharmacyInfoPageFooter,
            PharmacyInfoPageHeader,
            PharmacyInfoMedicationsList
        }
    }
</script>

