<template>
    <div class="card comment">
        <div class="card-header"><strong>{{comment.user.first_name}} {{comment.user.last_name}} said:</strong></div>
        <div class="card-body">{{comment.content}}</div> 
        <div class="card-footer">
            <p>{{comment.created_at | moment("calendar")}}</p>
            <button v-if="comment.user_id==this.$store.state.userId" type="button" 
                class="btn btn-danger"
                @click="deleteComment()">Delete</button>
        </div>
    </div>
</template>

<script>

export default {
    props: ['comment'],
    methods: {
        deleteComment() {
            this.$emit('deleteComment', this.comment)
        }
    }
}
</script>

<style scoped>
.comment {
    margin-top: 1rem;
    text-align: left;
}
.card {
    border: none;
    border-bottom: 1px solid #cccccc;
}
.card-header {
    color: #595959;
    background: transparent;
    border: none;
}
.card-footer {
    display: flex;
    justify-content: space-between;
    color: #595959;
    background: transparent;
    border: none;
}
</style>



