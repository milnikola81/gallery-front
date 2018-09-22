<template>
    <div class="input-group">
        <input v-model="imageArray[range-1]" @input="checkInput" class="form-control width100" type="url" placeholder="enter image url...">
        <span class="input-group-btn">
            <button class="btn btn-info" type="button" @click="addAnother">Add another</button>
        </span>
    </div>
</template>

<script>
export default {
    props: ['imageArray', 'range'],
    data() {
        return {
            inputValue: ''
        }
    },
    methods: {
        addAnother() {
            if(this.inputValue) {
                this.$emit('addAnother', this.range)
            }
        },
        checkInput(event) {
            this.inputValue = event.target.value
        }
    }
}
</script>
