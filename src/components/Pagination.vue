<template>
  <div>
    <button @click="$emit('decrement')">&lt;</button>
    <button v-for="numberOfPage in showNumberOfDecrementedPages()" :key="`some-${numberOfPage}`">
      {{ numberOfPage }}
    </button>
    <!-- <button
      v-for="numberOfPage in pagesToDisplay()"
      :key="numberOfPage.id"
      @click="metoda(numberOfPage)"
    >
      {{ numberOfPage }}
    </button> -->
    <button @click="setNumberOfCurrentPage(currentPage)">{{ currentPage }}</button>
    <button @click="$emit('increment')">&gt;</button>
    {{ currentPage }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    numberOfPages: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  methods: {
    pagesToDisplay(): number {
      return 5
    },
    setNumberOfCurrentPage(numberOfPage: number): void {
      console.log(numberOfPage)
      this.$emit('setPageNum', numberOfPage)
    },
    showNumberOfDecrementedPages() {
      console.log('this.currentPage', this.currentPage)
      const num = 0
      let myNumber = this.currentPage
      if (myNumber <= num) {
        console.log('-')
        return
      }
    },
  },
})
</script>
