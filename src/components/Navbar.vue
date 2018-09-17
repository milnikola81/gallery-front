<template>
    <div>
        <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="/">Galleries</a>
            <router-link :to="{ name: 'create'}">Create gallery</router-link>
            <div v-if="!isAuthenticated">
                <router-link :to="{ name: 'login'}" class="mr-3">Login</router-link>
                <router-link :to="{ name: 'register'}">Register</router-link>
            </div>
            <span id="logoutLink" v-else @click="logout">Logout</span>
        </nav>
    </div>
</template>

<script>
import { authService } from '../services/Auth'

export default {
    data() {
        return {
            isAuthenticated: authService.isAuthenticated()
        }
    },
    methods: {
        logout() {
            authService.logout()
            this.isAuthenticated = false
            this.$router.push({ name: 'login'});
        }
    },
}
</script>

<style scoped>

</style>


