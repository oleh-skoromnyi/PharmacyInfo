<template>
    <div class="body-content">
        <pharmacy-info-page-header></pharmacy-info-page-header>
        <pharmacy-info-table-with-paging></pharmacy-info-table-with-paging>
        <pharmacy-info-page-footer></pharmacy-info-page-footer>
    </div>
</template>

<script>
    import PharmacyInfoPageFooter from './PharmacyInfoPageFooter.vue';
    import PharmacyInfoPageHeader from './PharmacyInfoPageHeader.vue';
    import PharmacyInfoTableWithPaging from './PharmacyInfoTableWithPaging.vue';

    

    export default {
        components: {
            PharmacyInfoPageFooter,
            PharmacyInfoPageHeader,
            PharmacyInfoTableWithPaging
        }
    }
</script>

