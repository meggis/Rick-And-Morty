<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="btn-group align-middle" role="group">
          <button type="button" class="navi-button" @click="getAllCharacters">
            All characters
          </button>
          <button type="button" class="navi-button" @click="getFavourite">Favourites</button>
        </div>
        <div v-if="favourites || characters" id="table" class="mt-3">
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
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Home',
  computed: mapState(['characters', 'favourites', 'setNumberOfPages']),
  methods: {
    isFav(id: number): boolean {
      return this.favourites?.includes(id)
    },
    async setFavourite(id: number) {
      await this.$store.commit('setFavourite', id)
    },
    getFavourite(): void {
      if (!this.characters || !this.favourites.length) {
        this.$store.commit('reset')
      }
      this.$store.dispatch('getFavourite')
    },
    getAllCharacters(num: number): void {
      this.$store.dispatch('getAllCharacters')
      this.$store.commit('setNumberOfPages', num)
    },
    getLastEpisode(episode: string): string {
      const episodeCodeNumber = episode[episode.length - 1].match(/\d+$/)[0]
      if (episodeCodeNumber < 10) {
        return `S01E0${episodeCodeNumber}`
      }

      const firstDigit = episodeCodeNumber.toString()[0]
      const secondDigit = episodeCodeNumber.toString()[1]
      return `S0${firstDigit}E0${secondDigit}`
    },
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
.navi-button {
  border: none;
  background-color: transparent;
  padding: 10px;
  margin: 5px;
  &:focus {
    border-bottom: 2px solid $mainColour;
  }
}
</style>
