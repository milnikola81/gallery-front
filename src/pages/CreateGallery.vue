<template>
    <div id="create_gallery">
        <br>
        <h3>Create gallery</h3>
        <br>

        <form id="addGalleryForm" ref="form" @submit.prevent="addGallery">
            <div class="form-group">
                <label>Title</label> <br>
                <input v-model="newGallery.title" class="form-control" id="title" type="text" placeholder="enter title...">
                <p v-if="errors.title" style="color:red">{{errors.title[0]}}</p>
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea v-model="newGallery.description" class="form-control" id="description" rows="5" placeholder="enter description..."></textarea>
            </div>

            <p class="text-left">Add Images:</p> <br>



            <div v-for="(n, index) in range" :key="index" class="input-group image_input">
                <input v-model="newGallery.images[index]" class="form-control" id="image_input" type="text" placeholder="enter image url..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <b-img fluid v-if="newGallery.images[index]" :src=newGallery.images[index] alt="Thumbnail" class="thumbnail_image" />
                    <button class="btn btn-warning" type="button" v-if="range > 1" @click="moveUp(index)"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-secondary" type="button" v-if="range > 1" @click="moveDown(index)"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-danger" type="button" v-if="range > 1" @click="removeImage(index)"><i class="fas fa-trash-alt"></i></button>
                </div>
                <p v-if="errors.images" style="color:red" class="image_error">{{errors.images[0]}}</p>
                <p v-if="message[`${index}`]" style="color:red" class="image_error">{{message[index]}}</p>
                <p v-if="errors[`images.${index}`]" style="color:red" class="image_error">Please enter a valid URL</p>
            </div>

            
            <div id="button_row_add">
                <button @click="addAnother" class="btn btn-info" type="button">Add another image</button>
            </div>

            <br><br>

            <div id="button_row_bottom">
                <button class="btn btn-success">Submit</button>
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
            newGallery: {
                images: [],
                user_id: this.$store.state.userId,
            },
            // range: 1,
            imageArray: [],
            range: 1,
            errors: [],
            message: []
        }
    },
    methods: {
        addGallery() {
            this.message = []
            galleriesService.addGallery(this.newGallery)
                .then((response) => {
                    this.$router.push({name:'galleries'})
                    })
                .catch((errors) => {
                    this.errors = errors.response.data.errors
                })

        },
        addAnother() {
            this.errors = []
            this.message = []
            for(var i = 0; i<this.range; i++) {
                if(!this.newGallery.images[i]) {
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
            this.newGallery.images.splice(index, 1)
            this.range--
        },
        moveUp(index) {
            this.errors = []
            this.message = []
            if(index > 0) {
                this.newGallery.images = arrayMove(this.newGallery.images, index, index-1);
            }
        },
        moveDown(index) {
            this.errors = []
            this.message = []
            if(index < this.newGallery.images.length) {
                this.newGallery.images = arrayMove(this.newGallery.images, index, index+1);
            }
        }
    }
}
</script>


<style scoped>
#create_gallery {
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
    justify-content: space-between;
}
.image_input {
    margin-top: 2rem;
}
.thumbnail_image {
    width: 50px;
    height: 38px;
}
</style>


