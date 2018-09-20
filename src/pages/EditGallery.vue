<template>
    <div id="edit_gallery">
        <br>
        <h3>Edit gallery</h3>
        <br>

        <form id="editGalleryForm" ref="form" @submit.prevent="editGallery">
            <div class="form-group">
                <label>Title</label> <br>
                <input v-model="gallery.title" class="form-control" id="title" type="text" placeholder="enter title...">
                <p v-if="errors.title" style="color:red">{{errors.title[0]}}</p>
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea v-model="gallery.description" class="form-control" id="description" rows="5" placeholder="enter description..."></textarea>
            </div>

            <p class="text-left">Images:</p>

            <div v-for="(n, index) in range" :key="index" class="input-group image_input">
                <input v-if="index < (gallery.images.length)" v-model="images[index]" class="form-control" type="text" disabled>
                <input v-else v-model="images[index]" class="form-control" type="text">
                <div class="input-group-append">
                    <button class="btn btn-warning" type="button" v-if="index > 0" @click="moveUp(index)"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-secondary" type="button" v-if="index < (images.length-1)" @click="moveDown(index)"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-danger" type="button" v-if="images.length > 1" @click="removeImage(index)"><i class="fas fa-trash-alt"></i></button>
                </div>
                <p v-if="errors.images" style="color:red" class="image_error">{{errors.images[0]}}</p>
                <p v-if="message" style="color:red" class="image_error">{{message}}</p>
                <p v-if="errors[`images.${index}`]" style="color:red" class="image_error">Please enter a valid URL</p>
            </div>

            
            <div id="button_row_add">
                <button @click="addAnother" class="btn btn-info" type="button">Add another image</button>
            </div>

            <br><br>

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
            // newGallery: {
            images: [],
            //     user_id: this.$store.state.userId,
            // },
            // imageArray: [],
            range: 0,
            errors: [],
            message: ''
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
        // addGallery() {
        //     this.message = ''
        //     galleriesService.addGallery(this.newGallery)
        //         .then((response) => {
        //             this.$router.push({name:'galleries'})
        //             })
        //         .catch((errors) => {
        //             this.errors = errors.response.data.errors
        //         })

        // },
        addAnother() {
            // console.log(this.range)

            // this.range += 1
            // console.log(this.gallery.images[this.range-1])
            this.errors = []
            if(this.images[this.range-1]) {
                this.range += 1
                this.message = ''
            }
            else {
                this.message = "Please fill out the field above first"
            }
        },
        removeImage(index) {
            this.errors = ''
            this.message = ''
            this.images.splice(index, 1)
            // this.range--
        },
        moveUp(index) {
            if(index > 0) {
                this.images = arrayMove(this.images, index, index-1);
            }
        },
        moveDown(index) {
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
#image_input {
    /* display: inline-block; */
    /* display: flex;
    flex-direction: column; */
}
.image_error {
    position: absolute;
    width: 100%;
    margin-top: 36px;
    line-height: 24px;
    /* margin: 0 auto; */
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
</style>


