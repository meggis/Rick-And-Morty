<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="btn-group align-middle" role="group">
          <button type="button" class="btn" @click="getAllCharacters">All characters</button>
          <button type="button" class="btn" @click="getFavourite">Favorites</button>
        </div>
        <div v-if="!favourites">
          <h1>There is nothing</h1>
        </div>
        <div v-if="characters || favourites" id="table" class="mt-3">
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
                <td class="align-middle">{{ character.id }}</td>
                <td class="align-middle">{{ character.name }}</td>
                <td class="align-middle">
                  <span class="material-icons" v-if="character.gender === 'Male'"> male </span>
                  <span class="material-icons" v-if="character.gender === 'Female'"> female </span>
                  <span class="material-icons" v-if="character.gender === 'unknown'">
                    horizontal_rule
                  </span>
                  {{ character.gender }}
                </td>
                <td class="align-middle">{{ character.species }}</td>
                <td class="align-middle">{{ getLastEpisode(character.episode) }}</td>
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn star-border"
                    :class="{ active: isFav(character.id) }"
                    @click="setFavourite(character.id)"
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
import { mapState } from 'vuex'
// import axios from 'axios'

export default defineComponent({
  // data() {
  //   return {
  //     favourites: [],
  //   }
  // },
  computed: mapState(['characters', 'favourites']),
  methods: {
    isFav(id: number) {
      let rawFavourites = null
      if (isProxy(this.favourites)) {
        rawFavourites = toRaw(this.favourites)
      }
      return rawFavourites?.includes(id)
    },
    setFavourite(id: number) {
      this.$store.commit('setFavourite', id)
    },
    getFavourite() {
      this.$store.dispatch('getFavourite')
    },
    getAllCharacters() {
      this.$store.dispatch('getAllCharacters')
    },
    getLastEpisode(episode) {
      const episodeCodeumber = episode[episode.length - 1].match(/\d+$/)[0]
      if (episodeCodeumber < 10) {
        return `S01E0${episodeCodeumber}`
      }

      const firstDigit = episodeCodeumber.toString()[0]
      const secondDigit = episodeCodeumber.toString()[1]
      return `S0${firstDigit}E0${secondDigit}`
    },
    // getFavourite() {
    //   let mergedFavourites = this.favourites.join(',')
    //   // console.log(mergedFavourites)
    //   axios
    //     .get(`https://rickandmortyapi.com/api/character/${mergedFavourites}`)
    //     .then((response) => {
    //       this.characters = response.data
    //       this.numberOfPages = response.data.info.pages
    //     })
    //     .catch((error) => console.log(error))
    // },
  },
})
</script>

<style scoped lang="scss">
@import 'src/assets/styles/globalColour.scss';

.character-img {
  height: 5rem;
}
.table > :not(:first-child) {
  border-top: 1px;
  border-color: $lighterGrey !important;
}
.star-border {
  border-color: $mainColour;
  border-radius: 8px;
  background-color: white;
  &:hover {
    background-color: $lighterGrey;
  }
  &.active {
    background-color: $mainColour;
    .material-icons {
      color: white;
    }
  }
}
.material-icons {
  color: $mainColour;
  &.md-14 {
    font-size: 14px;
  }
}
table {
  color: $greyColour;
}
</style>
