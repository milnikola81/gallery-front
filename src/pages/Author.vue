<template>
    <div id="author_galleries">
        <br>
        <h3>authors page</h3>
        <br>

        <table class="table">
            <gallery-header />
            <tbody>

                <gallery-row v-if="loadedGalleries" v-for="(gallery, index) in loadedGalleries" :key="index" :gallery="gallery" />

            </tbody>
        </table>

        <button v-if="galleries.next_page_url" type="button" class="btn btn-success" id="load_more_btn" @click="loadMore">Load more...</button>

        <p v-if="!loadedGalleries.length">There are no galleries to show.</p>
    </div>
</template>

<script>
import { galleriesService } from '../services/Galleries'
import { usersService } from '../services/Users'
import GalleryHeader from '../components/GalleryHeader.vue'
import GalleryRow from '../components/GalleryRow.vue'

export default {
    components: {
    GalleryRow,
    GalleryHeader
    },
    data() {
        return {
            galleries: [],
            loadedGalleries: []
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            usersService.getAuthor(vm.$route.params.id)
                .then((response) => {
                    vm.galleries = response.data
                    vm.setGalleries(vm.galleries)
                })
        })
    },
    methods: {
        setGalleries(vmGalleries) {
            this.galleries = vmGalleries
            this.loadedGalleries = this.galleries.data
        },
        loadMore() {
            galleriesService.getNextPage(this.galleries.next_page_url, this.searchTerm)
                .then((response) => {
                    this.galleries = response.data
                    for(var i = 0; i < response.data.data.length; i++) {
                        this.loadedGalleries.push(response.data.data[i])
                    }
                })
        },
    }
}
</script>

<style scoped>
#author_galleries {
    text-align: center;
    padding-bottom: 3rem;
}
</style>

