<template>
    <div id="app_register">
        <h3>
            Register
        </h3>

        <form id="registerForm" @submit.prevent="addUser">
            <div class="form-group">
                <label>First name</label> <br>
                <input v-model="newUser.first_name" class="form-control" id="first_name" type="text" placeholder="enter first name..." required>
                <p v-if="errors.first_name" style="color:red">{{errors.first_name[0]}}</p>
            </div>

            <div class="form-group">
                <label>Last name</label> <br>
                <input v-model="newUser.last_name" class="form-control" id="last_name" type="text" placeholder="enter last name..." required>
                <p v-if="errors.last_name" style="color:red">{{errors.last_name[0]}}</p>
            </div>

            <div class="form-group">
                <label>Email</label> <br>
                <input v-model="newUser.email" class="form-control" id="email" type="email" placeholder="enter email..." required>
                <p v-if="errors.email" style="color:red">{{errors.email[0]}}</p>
            </div>

            <div class="form-group">
                <label>Password</label> <br>
                <input v-model="newUser.password" class="form-control" id="password" type="password" placeholder="enter password..." required>
                <p v-if="errors.password" style="color:red">{{errors.password[0]}}</p>
            </div>

            <div class="form-group">
                <label>Confirm password</label> <br>
                <input v-model="newUser.password_confirmation" class="form-control" type="password" id="password_confirmation" placeholder="enter password..." required>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="true" value="true" v-model="newUser.terms_accepted" required>
                <label class="form-check-label" for="true">Accept Terms and Conditions</label>
            </div>
            <p v-if="errors.terms_accepted" style="color:red">{{errors.terms_accepted[0]}}</p>

            <br><br>
            <div id="button_row">
                <button class="btn btn-success" type="submit">Register</button>
                <input class="btn btn-danger" type="reset" value="Reset" />
            </div>
            <br><br>
        </form>           
    </div>
</template>

<script>
import { authService } from '../services/Auth'
import { usersService } from '../services/Users'

export default {
    data() {
        return {
            newUser: {},
            errors: []
        }
    },
    methods: {
        addUser() {
            usersService.register(this.newUser)
                .then((response) => {
                    authService.login(this.newUser.email, this.newUser.password)
                        .then((response) => {
                        let userId = authService.getUserId()
                        this.$store.dispatch('modifyAuth', true)
                        this.$store.dispatch('modifyId', userId)           
                        this.$router.push({name:'galleries'})
                    })
                })
                .catch((errors) => {
                    this.errors = errors.response.data.errors
                })
        }
    },
}
</script>

<style scoped>
#app_register {
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
#button_row {
    display: flex;
    justify-content: space-around;
}
</style>




