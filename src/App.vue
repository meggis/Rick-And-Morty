<template>
  <Header />
  <hr />
  <Home :characters="characters" />
  <div class="layout">
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Footer from './views/shared/Footer.vue'
import Header from './views/shared/Header.vue'
import Home from './views/home/home.vue'
import axios from 'axios'

export default defineComponent({
  name: 'HomePage',
  components: {
    Footer,
    Header,
    Home,
  },
  data() {
    return {
      characters: [],
    }
  },
  created() {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((response) => {
        console.log(response.data.results)
        this.characters = response.data.results
      })
      .catch((error) => console.log(error))
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
