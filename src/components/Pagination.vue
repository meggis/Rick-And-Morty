<template>
  <div>
    <button @click="$emit('decrement')">&lt;</button>
    <button
      v-for="numberOfPage in numberOfPages"
      :key="numberOfPage.id"
      @click="$emit('setPageNum', numberOfPage)"
    >
      {{ numberOfPage }}
    </button>
    <button @click="$emit('increment')">&gt;</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    numberOfPages: {
      type: Number,
    },
  },
  // methods: {
  //   PaginationOnClick() {
  //     this.$emit('loadPageClicked', this.numberOfPages)
  //   },
  // },
}
</script>
