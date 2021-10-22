<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col">
        <div class="btn-group" role="group">
          <button type="button" class="btn" @click="$emit('getAllCharacters')">
            All characters
          </button>
          <button type="button" class="btn" @click="$emit('getFavourite')">Favorites</button>
        </div>
        {{ favourites }}
        <div v-if="!favourites">
          <h1>There is nothing</h1>
        </div>
        <div id="table" class="mt-3">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Character ID</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Species</th>
                <th scope="col">Last Episode</th>
                <th scope="col">Add To Favorites</th>
              </tr>
            </thead>
            <tbody v-for="(character, index) in characters" :key="index">
              <tr>
                <td class="align-middle">
                  <img class="character-img" :src="character.image" />
                </td>
                <td class="align-middle">{{ index }}</td>
                <td class="align-middle">{{ character.name }}</td>
                <td class="align-middle">
                  <span class="material-icons" v-if="character.gender === 'Male'"> male </span>
                  <span class="material-icons" v-if="character.gender === 'Female'"> female </span>
                  <span class="material-icons" v-if="character.gender === 'Unknown'">
                    horizontal_rule
                  </span>
                  {{ character.gender }}
                </td>
                <td class="align-middle">{{ character.species }}</td>
                <td class="align-middle">{{ 'Season ' + character.episode.length }}</td>
                <td class="align-middle" @click="$emit('setFavourite', character.id)">
                  <button
                    type="button"
                    class="btn star-border"
                    :class="{ active: isFav(character.id) }"
                  >
                    <span class="material-icons md-14">star</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <ul class="pagination"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { isProxy, toRaw } from 'vue'

export default defineComponent({
  props: {
    characters: {
      type: Object,
    },
    favourites: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
    },
  },
  methods: {
    isFav(id: number) {
      let rawFavourites = null
      if (isProxy(this.favourites)) {
        rawFavourites = toRaw(this.favourites)
      }
      return rawFavourites?.includes(id)
    },
  },
  // mounted() {

  // }
})
</script>

<style scoped lang="scss">
.character-img {
  height: 5rem;
}
.table > :not(:first-child) {
  border-top: 1px;
  border-color: #e5eaf4 !important;
}
.star-border {
  border-color: #11b0c8;
  border-radius: 8px;
  background-color: white;
  &:hover {
    background-color: #e5eaf4;
  }
  &.active {
    background-color: rgb(133, 12, 12);
  }
}
.material-icons {
  color: #11b0c8;
  &.md-14 {
    font-size: 14px;
  }
}
table {
  color: #a9b1bd;
}
</style>
