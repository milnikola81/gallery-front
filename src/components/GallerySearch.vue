<template>
    <form class="form-inline" @submit.prevent="searchGallery">
        <input v-model="searchTerm" class="form-control mr-sm-2" type="search" placeholder="search galleries..." aria-label="Search">
        <button class="btn bg-light my-2 my-sm-0" type="submit">Search</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: ''
        }
    },
    methods: {
        searchGallery() {
            this.$emit('searchGallery', this.searchTerm)
        },
    }
}
</script>

<style scoped>
form {
    /* padding-right: 1rem; */
    display: flex;
    justify-content: flex-end;
}
@media screen and (max-width: 767px) {
    form {
        width: 90%;
        margin: 0 auto;
        padding-right: 0;
    }
}
</style>


