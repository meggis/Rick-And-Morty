<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col">
        <div class="btn-group" role="group">
          <button type="button" class="btn">All characters</button>
          <button type="button" class="btn">Favorites</button>
        </div>
        <div id="table">
          <!-- {{ character }} -->
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
            <tbody v-for="character in characters" :key="character.id">
              <tr>
                <td class="align-middle">
                  <img class="character-img" :src="character.image" />
                </td>
                <td class="align-middle">{{ character.id }}</td>
                <td class="align-middle">{{ character.name }}</td>
                <td class="align-middle">{{ character.gender }}</td>
                <td class="align-middle">{{ character.species }}</td>
                <td class="align-middle">{{ character.episode.length }}</td>
                <td class="align-middle">
                  <button type="button" class="btn star-border">
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

export default defineComponent({
  name: 'Home',
  props: {
    characters: Object,
  },
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
