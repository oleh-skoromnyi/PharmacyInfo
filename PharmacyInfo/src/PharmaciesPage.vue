<template>
    <div class="body-content">
        <pharmacy-info-page-header></pharmacy-info-page-header>
        <pharmacy-info-pharmacies-list></pharmacy-info-pharmacies-list>
        <pharmacy-info-page-footer></pharmacy-info-page-footer>
    </div>
</template>

<script>
    import PharmacyInfoPageFooter from './PageFooter.vue';
    import PharmacyInfoPageHeader from './PageHeader.vue';
    import PharmacyInfoPharmaciesList from './PharmaciesList.vue';

    export default {
        components: {
            PharmacyInfoPageFooter,
            PharmacyInfoPageHeader,
            PharmacyInfoPharmaciesList
        }
    }
</script>

