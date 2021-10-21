<template>
  <Header />
  <hr />
  <Pagination
    :numberOfPages="numberOfPages"
    @increment="increment"
    @decrement="decrement"
    @PaginationOnClick="onLoadPage"
    @setPageNum="setPageNum"
  />
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
      currentPage: 1,
      numberOfPages: null,
    }
  },
  created() {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
      .then((response) => {
        console.log(response.data.info)
        this.characters = response.data.results
        this.numberOfPages = response.data.info.pages
      })
      .catch((error) => console.log(error))
  },
  methods: {
    async increment() {
      this.currentPage++
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    async decrement() {
      this.currentPage--
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    setPageNum(num: number): void {
      this.currentPage = num
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
        .then((response) => {
          this.characters = response.data.results
          this.numberOfPages = response.data.info.pages
        })
        .catch((error) => console.log(error))
    },
    // isSomeSet(): boolean {
    //   return !!this.currentPage
    // },
    // onCurrentPageClick(currentPage) {
    //   console.log(currentPage)
    // },
    // async pageChangeHandle(value) {
    //   switch (value) {
    //     case 'next':
    //       this.currentPage += 1
    //       break
    //     case 'previous':
    //       this.currentPage -= 1
    //       break
    //     default:
    //       this.currentPage = value
    //   }
    //   const { data } = await axios.get(
    //     `?country=us&page=${this.currentPage}&pageSize=${
    //       this.$options.static.visibleItemsPerPageCount
    //     }&category=business&apiKey=065703927c66462286554ada16a686a1`
    //   )
    // },
  },
  // async mounted() {
  //   const { data } = await axios.get(
  //       `https://rickandmortyapi.com/api/character?page=${this.currentPage}`
  //     ).then(
  //       this.characters = data.response.data.results
  //       this.numberOfPages = data.response.data.info.pages
  //     )
  // },
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
