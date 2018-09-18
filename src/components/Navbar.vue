<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-fixed-side navbar-fixed-side-left"  role="navigation" id="menu_top" style="background-color: #ecf1f4;">
            
        <a class="navbar-brand" href="/">Galleries</a>

        <button  id="nav-toggle-button" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav" id="navbar_inner">
                <router-link :to="{name:'galleries'}" class="menu_item">All galleries</router-link>
                <router-link v-if="setAuth" :to="{name:'my-galleries'}" class="menu_item">My galleries</router-link>
                <router-link v-if="setAuth" :to="{name:'create'}" class="menu_item">Create gallery</router-link>
                <router-link v-if="!setAuth" :to="{name:'login'}" class="mr-3 menu_item">Login</router-link>
                <router-link v-if="!setAuth" :to="{name:'register'}" class="menu_item">Register</router-link>
                <span id="logoutLink" v-if="setAuth" @click="logout" class="menu_item">Logout</span>
            </div>
        </div>

    </nav>
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
            this.$store.dispatch('modifyState', false)
            this.$router.push({ name: 'login'});
        }
    },
    computed: {
        setAuth() {
            return this.$store.state.isAuthenticated
        }
    }
}
</script>

<style scoped>
#menu_top {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, .3);
}
#logoutLink {
    color: #246FD7;
    cursor: pointer;
}
#logoutLink:hover {
    color: #2445AC;
    text-decoration: underline;
}
#navbar_inner {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
#nav-toggle-button {
    border: none;
    outline: none;
}
.menu_item {
    line-height: 40px;
}
</style>


