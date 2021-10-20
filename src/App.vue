<template>
  <Header />
  <hr />
  <div class="layout">
    <Home />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Footer from './views/shared/Footer.vue'
import Header from './views/shared/Header.vue'
import Home from './views/home/Home.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Footer,
    Header,
    Home,
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
