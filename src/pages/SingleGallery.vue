<template>
    <h3>
        {{gallery.title}}
    </h3>
</template>

<script>
import { galleriesService } from '../services/Galleries'

export default {
    data () {
        return {
            gallery: {},
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            galleriesService.get(vm.$route.params.id)
            .then((response) => {
                vm.gallery = response.data
            })
        })
    },
}
</script>
