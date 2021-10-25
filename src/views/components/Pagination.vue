<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button v-if="currentPage > 1" @click="decrement">&lt;</button>
        <button v-for="numberOfPage in showNumberOfDecrementedPages()" :key="`${numberOfPage}`">
          {{ numberOfPage }}
        </button>
        <button class="active">
          {{ currentPage }}
        </button>
        <button
          v-for="numberOfPage of pagesToAdd()"
          :key="numberOfPage.id"
          @click="setNumberOfCurrentPage(numberOfPage)"
        >
          {{ numberOfPage }}
        </button>
        <button @click="increment">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { mapState } from 'vuex'

export default defineComponent({
  computed: mapState(['currentPage', 'characters', 'numberOfPages']),
  created() {
    this.pagesToDecrement()
  },
  methods: {
    pagesToDisplay(): number {
      return 5
    },
    setNumberOfCurrentPage(numberOfPag: number): void {
      this.$store.commit('setCurrentPage', numberOfPag)
      this.$store.dispatch('getAllCharacters')
    },
    showNumberOfDecrementedPages() {
      const num = 0
      let myNumber = this.currentPage
      if (myNumber <= num) {
        return
      }
    },
    pagesToDecrement(): number {
      let num = 0
      if (this.currentPage === 1 || !this.currentPage) {
        return num
      }

      return this.currentPage - 1
    },
    pagesToAdd(): number[] | number {
      // this.maxPages
      let limit = 3
      const numLeft = this.numberOfPages - this.currentPage

      if (numLeft <= 3) {
        limit = numLeft
      }
      const pages = []
      if (numLeft === 0 || !this.currentPage) {
        return 0
      }

      for (let i = 0; i < limit; i++) {
        pages.push(this.currentPage + (i + 1))
      }

      return pages
    },
    increment() {
      this.$store.commit('incrementPage')
      this.$store.dispatch('getAllCharacters')
    },
    decrement() {
      this.$store.commit('decrementPage')
      this.$store.dispatch('getAllCharacters')
    },
  },
})
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/globalColour.scss';
button {
  border: 1px solid $greyColour;
  padding: 2px 10px;
  margin: 0px 3px;
  border-radius: 4px;
  background-color: white;
  &:hover {
    background-color: $mainColour;
    color: white;
  }

  &.active {
    background-color: $mainColour;
    color: white;
  }
}
</style>
