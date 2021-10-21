<template>
  <Header @setFilteredTypeAndValue="setFilteredTypeAndValue" />
  <hr />
  <Pagination
    :numberOfPages="numberOfPages"
    @increment="increment"
    @decrement="decrement"
    @setPageNum="setPageNum"
  />
  <Home :characters="characters" :favorites="favorites" />
  <div class="layout">
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Footer from './views/shared/Footer.vue'
import Header from './views/shared/Header.vue'
import Home from './views/home/home.vue'
import Pagination from './components/Pagination.vue'
import axios from 'axios'

export default defineComponent({
  name: 'HomePage',
  components: {
    Pagination,
    Footer,
    Header,
    Home,
  },
  data() {
    return {
      characters: [],
      favorites: [],
      currentPage: 1,
      numberOfPages: null,
    }
  },
  created() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    setFilteredTypeAndValue({ type, value }) {
      console.log(type, value)
      axios
        .get(`https://rickandmortyapi.com/api/character/?${type}=${value}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    increment() {
      this.currentPage++
      this.fetchItems()
    },
    decrement() {
      this.currentPage--
      this.fetchItems()
    },
    async setPageNum(num: number): void {
      this.currentPage = num
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
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
