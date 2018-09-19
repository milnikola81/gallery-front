<template>
    <div id="author_galleries">
        <br>
        <h3>authors page</h3>
        <br>

        <table class="table">
            <gallery-header />
            <tbody>

                <gallery-row v-if="galleries" v-for="(gallery, index) in galleries" :key="index" :gallery="gallery" />

            </tbody>
        </table>

        <p v-if="!galleries.length">There are no galleries to show.</p>

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
        }
    }
}
</script>
