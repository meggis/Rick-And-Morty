<template>
  <div class="container">
    <div class="row justify-content-start">
      <div class="col-4">
        <img class="my-4" src="@/assets/images/logo.png" alt="Rick and Morty logo" />
      </div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-5 align-self-center">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text search-label-padding">Search by</label>
          </div>
          <select class="custom-select search-label-padding" v-model="selected">
            <option class="option-style" value="name">Name</option>
            <option class="option-style" value="id">Identifier</option>
            <option class="option-style" value="episode">Episode</option>
          </select>
          <input
            type="text"
            class="form-control my-icon"
            aria-label="Text input with dropdown button"
            @keyup="submitFiltering($event)"
          />
        </div>
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Header',
  data() {
    return {
      selected: 'name',
    }
  },
  computed: mapState(['characters']),
  methods: {
    submitFiltering({ target }): void {
      if (this.selected === 'episode') {
        return this.$store.dispatch('filterByEpisode', target.value)
      }

      this.$store.dispatch('setFilteredTypeAndValue', { type: this.selected, value: target.value })
    },
  },
})
</script>

<style lang="scss">
@import 'src/assets/styles/globalColour.scss';
.my-icon {
  background-image: url('@/assets/images/search-icon.png');
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.search-label-padding {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  div {
    background-color: black;
  }
}
.input-group-text {
  background-color: white !important;
  color: $greyColour !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
select {
  color: $greyColour !important;
  border-color: $greyColour !important;
}
</style>
