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

        <h5 id="comments_headline"><em>Comments <span v-if="gallery.comments">({{gallery.comments.length}})</span></em></h5>
        
        <comment v-if="gallery.comments"  
            v-for="(comment, index) in gallery.comments" :key="index" 
            :comment="gallery.comments[index]" />
         <!-- v-for="(comment, index) in gallery.comments" :key="index" -->

        <create-comment v-if="checkAuth" :gallery="gallery" />

    </div>
</template>

<script>
import { galleriesService } from '../services/Galleries';
import Comment from '../components/Comment'
import CreateComment from '../components/CreateComment'

export default {
    components: {
        Comment,
        CreateComment
    },
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
                console.log(response.data)
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
    /* border: 0px !important; */
    /* position: relative; */
}
#carousel:active {
    border: 0px !important;
    outline: 0px !important;
}
.carousel:before, .carousel:after
{
  z-index: -1;
  position: absolute;
  content: "";
  bottom: 15px;
  left: 10px;
  width: 50%;
  top: 80%;
  /* max-width:300px; */
  background: #777;
  -webkit-box-shadow: 0 15px 10px #777;
  -moz-box-shadow: 0 15px 10px #777;
  box-shadow: 0 15px 10px #777;
  -webkit-transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  -o-transform: rotate(-3deg);
  -ms-transform: rotate(-3deg);
  transform: rotate(-3deg);
}
.carousel:after
{
  -webkit-transform: rotate(3deg);
  -moz-transform: rotate(3deg);
  -o-transform: rotate(3deg);
  -ms-transform: rotate(3deg);
  transform: rotate(3deg);
  right: 10px;
  left: auto;
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
#comments_headline {
    margin-top: 2rem;
    text-align: left;
    color: #999999;
    padding-bottom: 1rem;
    border-bottom: 1px solid #cccccc;
}

</style>
