<template>
  <div>
    <button @click="$emit('decrement')">&lt;</button>
    <!-- <button v-for="numberOfPage in showNumberOfDecrementedPages()" :key="`some-${numberOfPage}`">
      {{ numberOfPage }}
    </button> -->
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
      const num = 0
      // let myNumbers = this.numberOfPages
      let myNumber = this.currentPage
      if (myNumber <= num) {
        console.log('-')
        return
      }
      // {
      //   for (let i = num; i < myNumbers; i++) {
      //     if (myNumber <= myNumbers && myNumber > 0) {
      //       console.log('kkdkdkdk')
      //     }
      //   }
      // }
    },
  },
})
</script>
