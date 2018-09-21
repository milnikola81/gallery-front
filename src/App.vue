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
.app_content {
    max-width: 60%;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 3rem;
}
@media screen and (max-width: 768px) {
    .app_content {
        max-width: 90%;
    }
}
.galleries_table {
    max-width: 90%;
    margin: 0 auto;
    margin-top: 3rem;
}
@media screen and (max-width: 768px) {
    galleries_table {	
		    font-size: 0.7rem;
        margin: 0 auto;
        margin-top: 1rem;
    }
}

</style>
