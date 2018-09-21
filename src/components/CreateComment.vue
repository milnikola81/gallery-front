<template>
    <div id="create_comment_section">
            <h5><em>Leave a comment . . .</em></h5>
            <form id="addCommentForm" @submit.prevent="addComment">

                <div class="form-group">
                    <textarea v-model="newComment.content" class="form-control" id="content" rows="5" placeholder="enter comment..."></textarea>
                </div>
                <p v-if="errors.content" style="color:red" class="text-center">{{errors.content[0]}}</p>


                <button class="btn btn-success">Submit</button>

            </form>
        </div>
</template>

<script>
import { commentsService } from '../services/Comments';

export default {
    props: ['gallery'],
    data() {
        return {
            newComment: {},
            errors: []
        }
    },
    methods: {
        addComment() {
            this.newComment.gallery_id = this.gallery.id
            this.newComment.user_id = window.localStorage.getItem('userId')
            commentsService.addComment(this.newComment)
                .then((response) => {
                    this.gallery.comments.push(response.data)
                    this.newComment = {}
                    this.errors = []
                })
                .catch((errors) => {
                    this.errors = errors.response.data.errors
                })
        }
    }
}
</script>

<style scoped>
#create_comment_section {
    margin-top: 2rem;
    text-align: left;
}
#create_comment_section h5 {
    color: #999999;
    padding-bottom: 1rem;
}
</style>


