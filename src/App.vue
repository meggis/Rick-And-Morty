<template>
  <div class="wrapper">
    <Header />
    <hr />
    <Home :characters="characters" />
    <Pagination />
  </div>
  <div class="footer">
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Footer from './views/shared/Footer.vue'
import Header from './views/shared/Header.vue'
import Home from './views/components/Home.vue'
import Pagination from './views/components/Pagination.vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'HomePage',
  components: {
    Pagination,
    Footer,
    Header,
    Home,
  },
  computed: mapState(['currentPage', 'characters', 'setNumberOfPages']),
  created() {
    this.getAllCharacters()
  },
  methods: {
    getAllCharacters() {
      this.$store.dispatch('getAllCharacters')
    },
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
.wrapper {
  min-height: 100%;
  margin-bottom: -50px;
}
.footer {
  height: 50px;
  margin-top: 50px;
  text-align: center;
}
</style>
