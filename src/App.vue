<template>
  <div id="app">
    <navbar />
    <router-view class="add_padding_top"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>


<style>
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.add_padding_top {
  padding-top: 1rem;
}

</style>
