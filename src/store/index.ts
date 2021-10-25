import { createStore } from 'vuex'
import axios from 'axios'

const initialState = {
  characters: [],
  favourites: [],
  currentPage: 1,
  numberOfPages: null,
}

const store = createStore({
  state: {
    ...initialState,
  },
  mutations: {
    setCurrentPage(state, pageNumber) {
      state.currentPage = pageNumber
    },
    incrementPage(state) {
      state.currentPage++
    },
    decrementPage(state) {
      state.currentPage--
    },
    setCharacters(state, newCharacters) {
      state.characters = newCharacters
    },
    setNumberOfPages(state, num) {
      state.numberOfPages = num
    },
    setFavourite(state, id) {
      if (!state.favourites.includes(id)) {
        state.favourites.push(id)
        console.log(state.favourites)
        return
      }
      const foundId = state.favourites.indexOf(id)
      state.favourites.splice(foundId, 1)
    },
    reset(state) {
      state.characters = []
      state.numberOfPages = null
    },
  },
  actions: {
    async getAllCharacters({ commit, state }) {
      await axios
        .get(`https://rickandmortyapi.com/api/character?page=${state.currentPage}`)
        .then((response) => {
          commit('setCharacters', response.data.results)
          commit('setNumberOfPages', response.data.info.pages)
        })
        .catch((error) => console.log(error))
    },
    async getFavourite({ commit, state }) {
      const mergedFavourites = state.favourites.join(',')
      await axios
        .get(`https://rickandmortyapi.com/api/character/${mergedFavourites}`)
        .then((response) => {
          commit('setCharacters', response.data)
          commit('setNumberOfPages', response.data.info.pages)
        })
        .catch((error) => console.log(error))
    },
    async setFilteredTypeAndValue({ commit }, { type, value }) {
      await axios
        .get(`https://rickandmortyapi.com/api/character/?${type}=${value}`)
        .then((response) => {
          console.log(response)
          console.log(response)
          commit('setCharacters', response.data.results)
          commit('setNumberOfPages', response.data.info.pages)
        })
        .catch((error) => {
          commit('reset')
          console.log(error)
        })
    },
    async filterByEpisode({ commit }, value) {
      await axios
        .get(`https://rickandmortyapi.com/api/episode/?episode=${value}`)
        .then((response) => {
          console.log(response)
          console.log(response)
          commit('setCharacters', response.data.results)
          commit('setNumberOfPages', response.data.info.pages)
        })
        .catch((error) => {
          commit('reset')
          console.log(error)
        })
    },
  },
  modules: {},
})

export default store
