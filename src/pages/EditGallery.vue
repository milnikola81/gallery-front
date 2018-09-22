<template>
    <div id="edit_gallery">
        <br>
        <h3>Edit gallery</h3>
        <br>

        <h4 v-if="gallery.user_id!=this.$store.state.userId">Galleries are editable by authors only!</h4>

        <form v-else id="editGalleryForm" ref="form" @submit.prevent="editGallery">
            <div class="form-group">
                <label>Title</label> <br>
                <input v-model="gallery.title" class="form-control" id="title" type="text" placeholder="enter title..." required>
                <p v-if="errors.title" style="color:red">{{errors.title[0]}}</p>
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea v-model="gallery.description" class="form-control" id="description" rows="5" placeholder="enter description..."></textarea>
            </div>

            <p class="text-left">Images:</p>

            <div v-for="(n, index) in range" :key="index" class="input-group image_input">
                <input v-if="index < (gallery.images.length)" v-model="images[index]" class="form-control" type="url">
                <input v-else v-model="images[index]" class="form-control" type="url">
                <div v-if="images.length > 1" class="input-group-append">
                    <b-img fluid v-if="images[index]" :src=images[index] alt="Thumbnail" class="thumbnail_image" />
                    <button class="btn btn-warning" type="button" @click="moveUp(index)"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-secondary" type="button" @click="moveDown(index)"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-danger" type="button" @click="removeImage(index)"><i class="fas fa-trash-alt"></i></button>
                </div>
                <p v-if="errors.images" style="color:red" class="image_error">{{errors.images[0]}}</p>
                <p v-if="message[`${index}`]" style="color:red" class="image_error">{{message[index]}}</p>
                <p v-if="errors[`images.${index}`]" style="color:red" class="image_error">Please enter a valid URL</p>
            </div>

            
            <div id="button_row_add">
                <button @click="addAnother" class="btn btn-info" type="button">Add another image</button>
            </div>

            <br><br>

            <p v-if="warning" style="color:red">{{warning}}</p>

            <div id="button_row_bottom">
                <button class="btn btn-success">Done</button>
                <router-link :to="{name:'my-galleries'}" tag="button" class="btn btn-danger">Cancel</router-link>
            </div>
            <br><br>
        </form>
    </div>
</template>

<script>
import { galleriesService } from '../services/Galleries'
import ImageInput from '../components/ImageInput'
var arrayMove = require('array-move')

export default {
    components: {
        ImageInput
    },
    data() {
        return {
            gallery: {},
            images: [],
            range: 0,
            errors: [],
            message: [],
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            galleriesService.get(vm.$route.params.id)
                .then((response) => {
                    vm.gallery = response.data
                    vm.range = response.data.images.length
                    for (var i=0; i<vm.gallery.images.length; i++) {
                        vm.images.push(vm.gallery.images[i].image_url)
                    }
                })
        })
    },
    methods: {
        editGallery() {
            this.gallery.images = this.images
            this.message = []
            for(var i = 0; i<this.gallery.images.length; i++) {
                if(!this.gallery.images[i]) {
                    this.message[i] = "Please fill out this empty field"
                }
            }
            if(this.message.length === 0) {
                galleriesService.editGallery(this.gallery)
                    .then((response) => {
                        this.$router.push({name:'my-galleries'})
                        })
                    .catch((errors) => {
                        this.errors = errors.response.data.errors
                    })
            }
        },
        addAnother() {
            this.errors = []
            this.message = []
            for(var i = 0; i<this.range; i++) {
                if(!this.images[i]) {
                    this.message[i] = "Please fill out this empty field"
                }
            }
            if(!this.message.length) {
                this.range += 1
            }
        },
        removeImage(index) {
            this.errors = []
            this.message = []
            this.images.splice(index, 1)
            this.range--
        },
        moveUp(index) {
            this.errors = []
            this.message = []
            if(index > 0) {
                this.images = arrayMove(this.images, index, index-1);
            }
        },
        moveDown(index) {
            this.errors = []
            this.message = []
            if(index < this.images.length) {
                this.images = arrayMove(this.images, index, index+1);
            }
        }
    }
}
</script>


<style scoped>
#edit_gallery {
    text-align: center;
}
form {
    width: 70%;
    margin: 0 auto;
}
@media screen and (max-width: 767px) {
    form {
        width: 90%;
    }
}
.image_error {
    position: absolute;
    width: 100%;
    margin-top: 36px;
    line-height: 24px;
}
#button_row {
    display: flex;
    justify-content: space-around;
}
#button_row_add {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-start;
}
#button_row_bottom {
    display: flex;
    justify-content: space-around;
}
.image_input {
    margin-top: 2rem;
}
.thumbnail_image {
    width: 50px;
    height: 38px;
}
</style>


