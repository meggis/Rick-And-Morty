<template>
  <div class="wrapper">
    <Header @setFilteredTypeAndValue="setFilteredTypeAndValue" />
    <hr />
    <Pagination />
    <Home :currentPage="currentPage" :characters="characters" :favourites="favourites" />
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
// import axios from 'axios'
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
    increment() {
      this.$store.commit('incrementPage')
      this.$store.dispatch('getAllCharacters')
    },
    decrement() {
      this.$store.commit('decrementPage')
      this.$store.dispatch('getAllCharacters')
    },
    setPageNum(num: number): void {
      this.$store.commit('setCurrentPage', num)
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
  // overflow: auto;
}
.footer {
  height: 50px;
  margin-top: 50px;
  text-align: center;
}
</style>
