<template>
  <Header @setFilteredTypeAndValue="setFilteredTypeAndValue" />
  <hr />
  {{ favourites }}
  <Pagination
    :numberOfPages="numberOfPages"
    @increment="increment"
    @decrement="decrement"
    @setPageNum="setPageNum"
  />
  <Home
    :currentPage="currentPage"
    :characters="characters"
    @setFavourite="setFavourite"
    :favourites="favourites"
    @getFavourite="getFavourite"
    @getAllCharacters="getAllCharacters"
  />
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
      favourites: [],
      currentPage: 1,
      numberOfPages: null,
    }
  },
  created() {
    this.getAllCharacters()
  },
  methods: {
    getAllCharacters() {
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
        .then((response) => {
          this.characters = response.data.results
          // this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    setFilteredTypeAndValue({ type, value }: string) {
      // console.log(type, value)
      axios
        .get(`https://rickandmortyapi.com/api/character/?${type}=${value}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    setFavourite(id: number) {
      if (!this.favourites.includes(id)) {
        this.favourites.push(id)
        return
      }
      const foundId = this.favourites.indexOf(id)
      this.favourites.splice(foundId, 1)
    },
    getFavourite() {
      let mergedFavourites = this.favourites.join(',')
      axios
        .get(`https://rickandmortyapi.com/api/character/${mergedFavourites}`)
        .then((response) => {
          this.characters = response.data
          console.log(response.data)
          // this.numberOfPages = response.data.info.pages
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
