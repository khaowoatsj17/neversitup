import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    textRules: {
      required: (v) => !!v || 'กรุณากรอกข้อมูล.',
      UsernameRules: (v) => !!v || 'กรุณากรอก Username.',
      PasswordRules: (v) => !!v || 'กรุณากรอก Password.'
    },
    infoAllToDo: [],
    infoToDoByID: {}
  },
  getters: {
    SendAPIWithHeader: () => async (api) => {
      const response = await axios({
        ...api,
        headers: {
          authorization:
            'Bearer ' + cookies.get('Token')
        }
      }).catch((error) => {
        return error.response
      })
      return response
    }
  },
  mutations: {
    updateAllToDo (state, data) {
      state.infoAllToDo = data
    },
    updateToDoByID (state, data) {
      state.infoToDoByID = data
    }
  },
  actions: {
    async getAllToDo ({ commit, getters }) {
      const api = {
        method: 'get',
        url: 'https://candidate.neversitup.com/todo/todos/',
        data: {}
      }
      const response = await getters.SendAPIWithHeader(api)
      const success = response.status === 200
      if (success) {
        commit('updateAllToDo', response.data)
      }
      return new Promise((resolve, reject) => {
        return success ? resolve(response) : reject(response)
      })
    },
    async getToDoByID ({ commit, getters }, id) {
      const api = {
        method: 'get',
        url: 'https://candidate.neversitup.com/todo/todos/' + id,
        data: {}
      }
      const response = await getters.SendAPIWithHeader(api)
      const success = response.status === 200
      if (success) {
        commit('updateToDoByID', response.data)
      }
      return new Promise((resolve, reject) => {
        return success ? resolve(response) : reject(response)
      })
    },
    async addToDo ({  getters }, data) {
      const api = {
        method: 'post',
        url: 'https://candidate.neversitup.com/todo/todos/',
        data: data
      }
      const response = await getters.SendAPIWithHeader(api)
      const success = response.status === 200
      return new Promise((resolve, reject) => {
        return success ? resolve(response) : reject(response)
      })
    },
    async editToDo ({  getters }, data) {
      const api = {
        method: 'put',
        url: 'https://candidate.neversitup.com/todo/todos/' + data._id,
        data: data
      }
      const response = await getters.SendAPIWithHeader(api)
      const success = response.status === 200
      return new Promise((resolve, reject) => {
        return success ? resolve(response) : reject(response)
      })
    },
    async deleteToDo ({  getters }, id) {
      const api = {
        method: 'delete',
        url: 'https://candidate.neversitup.com/todo/todos/' + id,
        data: {}
      }
      const response = await getters.SendAPIWithHeader(api)
      const success = response.status === 200
      return new Promise((resolve, reject) => {
        return success ? resolve(response) : reject(response)
      })
    }
  },
  modules: {
  }
})
