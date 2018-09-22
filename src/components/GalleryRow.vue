<template>
    <tr>
        <td @click="showGallery" class="title">
            {{gallery.title}}
        </td>
        <td class="d-none d-md-table-cell description">
            <span id="description">{{gallery.description}}</span>
        </td>
        <td @click="showAuthor" class="author">
            {{gallery.user.first_name+' '+gallery.user.last_name}}
        </td>
        <td class="d-none d-md-table-cell created_at">
            {{gallery.created_at}}
        </td>
        <td>
            <img v-if="gallery.images[0]" v-bind:src=gallery.images[0].image_url />
        </td>
    </tr>
</template>

<script>
import { galleriesService } from '../services/Galleries'
import { authService } from '../services/Auth'
import { usersService } from '../services/Users'

export default {
    props: ['gallery'],
    methods: {
        showGallery() {
            galleriesService.get(this.gallery.id)
                .then((response) => {
                    this.$router.push({ name: 'single-gallery', params: { id: this.gallery.id }})
                })
        },
        showAuthor() {
            galleriesService.getAuthor(this.gallery.user_id)
                .then((response) => {
                    this.$router.push({ name: 'author', params: { id: this.gallery.user_id }})
                })
        }
    }
}
</script>

<style scoped>
#description {
    text-align: justify;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.title, .author, .created_at {
    text-align: left;
}
.title:hover, .author:hover {
    cursor: pointer;
}
img {
    height: 90px;
    box-shadow: 0 10px 6px -6px #777;
}
@media screen and (max-width: 767px) {
    img {
        height: 70px;
    }
    td {
        font-size: 0.7rem;
    }
}
</style>

