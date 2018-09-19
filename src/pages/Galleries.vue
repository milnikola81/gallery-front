<template>
    <div id="galleries">
        <br>
        <h3>Galleries page</h3>
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
            galleriesService.getAll()
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

<style>
#galleries {
    text-align: center;
    padding-bottom: 3rem;
}
table {
    max-width: 90%;
    margin: 0 auto;
    margin-top: 3rem;
}
@media screen and (max-width: 767px) {
    table {		
		font-size: 0.8rem;
        margin-top: 1rem;
    }
}
</style>




