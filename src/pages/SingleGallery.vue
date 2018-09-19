<template>
    <div id="single_gallery">
        <br>
        <h3>{{gallery.title}}</h3>
        <br>

        <div id="gallery_info">
            <p class="d-inline" @click="showAuthor"><em>. . . by {{author}}</em></p>
            <p class="d-inline"><em>. . . created on {{gallery.created_at | moment("MMMM Do YYYY")}}</em></p>
        </div>

        <p class="text-left description">{{gallery.description}}</p>

        <b-carousel id="carousel"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="0"
                img-width="640"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
        >
            <a v-for="(image, index) in gallery.images" :key="index" :href="image.image_url">
                <b-carousel-slide  :img-src="image.image_url">
                </b-carousel-slide>
            </a>

        </b-carousel>

    </div>
</template>

<script>
import { galleriesService } from '../services/Galleries';

export default {
    data () {
        return {
            gallery: {},
            slide: 0,
            sliding: null,
            author: '',
            checkAuth: this.$store.state.isAuthenticated
        }
    },
    methods: {
        onSlideStart (slide) {
            this.sliding = true
        },
        onSlideEnd (slide) {
            this.sliding = false
        },
        showAuthor() {
            galleriesService.getAuthor(this.gallery.user_id)
            .then((response) => {
                this.$router.push({ name: 'author', params: { id: this.gallery.user_id }})
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            galleriesService.get(vm.$route.params.id)
            .then((response) => {
                vm.gallery = response.data
                vm.author = vm.gallery.user.first_name+' '+vm.gallery.user.last_name
            })
        })
    },
}
</script>

<style scoped>
#single_gallery {
    text-align: center;
    padding-bottom: 3rem;
    width: 80%;
    margin: 0 auto;
}
@media screen and (max-width: 767px) {
    #single_gallery {
        width: 90%;
    }
}
#carousel {
    width: 80%;
    margin: 0 auto;
}
@media screen and (max-width: 767px) {
    #carousel {
        width: 100%;
    }
}
#gallery_info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #999999;
}
@media screen and (max-width: 767px) {
    #gallery_info {
        flex-direction: column;
        text-align: left;
    }
    #gallery_info p {
        margin-bottom: 0.3rem;
    }
}
@media screen and (max-width: 767px) {
    .description {
        margin-top: 1rem;
    }
}

</style>
