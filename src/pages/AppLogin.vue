<template>
    <div id="app_login">
        <h3>Login</h3>

        <form id="loginForm" @submit.prevent="login">
            <div class="form-group">
                <label>Email</label> <br>
                <input v-model="email" class="form-control" id="email" type="email" placeholder="enter email..." required>
            </div>

            <div class="form-group">
                <label>Password</label> <br>
                <input v-model="password" class="form-control" id="password" type="password" placeholder="enter password..." required>
            </div>

            <p v-if="error" style="color: red">The username or password you have entered is invalid.</p>

            <button class="btn btn-success" type="submit">Login</button>

        </form>           
    </div>
</template>

<script>
import { authService } from '../services/Auth'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login() {
            authService.login(this.email, this.password)
                .then((response) => {
                    let userId = authService.getUserId()
                    this.$store.dispatch('modifyAuth', true)
                    this.$store.dispatch('modifyId', userId)
                    this.$router.push({name:'galleries'})
                })
                .catch(error => {
                    this.error = error.response.data.error
                })
        }
    }
}
</script>


<style scoped>
#app_login {
    text-align: center;
}
form {
    width: 40%;
    margin: 0 auto;
    margin-top: 2rem;
}
@media screen and (max-width: 767px) {
    form {
        width: 90%;
    }
}

</style>

