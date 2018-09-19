<template>
    <tr>
        <td @click="showGallery" class="title">
            {{gallery.title}}
        </td>
        <td class="d-none d-sm-table-cell description">
            {{gallery.description}}
        </td>
        <td @click="showAuthor" class="author">
            {{author}}
        </td>
        <td class="d-none d-sm-table-cell created_at">
            {{gallery.created_at}}
        </td>
        <td>

        </td>
    </tr>
</template>

<script>
import { galleriesService } from '../services/Galleries'
import { authService } from '../services/Auth'

export default {
    props: ['gallery'],
    data() {
        return {
            author: this.gallery.user.first_name+' '+this.gallery.user.last_name
        }
    },
    methods: {
        showGallery() {
            galleriesService.get(this.gallery.id)
            .then((response) => {
                this.$router.push({ name: 'single-gallery', params: { id: this.gallery.id }})
            })
        },
        showAuthor() {
            authService.get(this.gallery.user_id)
            .then((response) => {
                this.$router.push({ name: 'author', params: { id: this.gallery.user_id }})
            })
        }
    }
}
</script>

<style scoped>
.description {
    text-align: justify;
}
.title, .author, .created_at {
    text-align: left;
}
</style>

