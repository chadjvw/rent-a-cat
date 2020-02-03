import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Cat } from '@/types/Cat'

Vue.use(Vuex)

const baseUrl = process.env.VUE_APP_API_URL

interface State {
  cart: number[]
  cats: Cat[]
}

const defaultState: State = {
  cart: [],
  cats: []
}

const store = new Vuex.Store({
  state: defaultState,
  mutations: {
    clearCart(state) {
      state.cart = []
    },
    setCart(state, cart) {
      state.cart = cart
    },
    updateCats(state, cats) {
      state.cats = cats
    },
    addRental(state, catId: number) {
      state.cart.push(catId)
    },
    removeRental(state, catId: number) {
      const catIndex = state.cart.indexOf(catId)

      const newCart = state.cart

      newCart.splice(catIndex, 1)

      state.cart = newCart
    }
  },
  getters: {
    cats: state => {
      return state.cats
    },
    cart: state => {
      return state.cart
    },
    cartSize: state => {
      return state.cart.length
    },
    getCat: state => (id: number) => {
      return state.cats.find(c => c.id === id)
    }
  },
  actions: {
    async fetchCats({ commit }) {
      const response = await axios.get(`${baseUrl}/api/cats`)

      commit(
        'updateCats',
        response.data.map((c: Cat) => Object.assign({ id: Number(c.SK) }, c))
      )
    },
    async rent({ commit }, catId: number) {
      updateCart(catId, 1)

      commit('addRental', catId)
    },
    async unRent({ commit }, catId: number) {
      updateCart(catId, -1)

      commit('removeRental', catId)
    },
    async savedCart({ commit }) {
      const cartId = localStorage.getItem('cartId')

      const response = await axios.get(`${baseUrl}/api/cart/${cartId}`)

      commit('setCart', response.data)
    },
    async order({ commit }) {
      try {
        const cartId = localStorage.getItem('cartId')

        const response = await axios.post(`${baseUrl}/api/order`, {
          cartId
        })

        window.alert(`Order Submitted. Order Number: ${response.data.orderNumber}`)
      } catch (e) {
        console.error('Unable to create order', e)

        throw new Error('Unable to create order')
      }

      commit('clearCart')
    },
    newCart() {
      const cartId =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)

      localStorage.setItem('cartId', cartId)
    }
  }
})

export default store

async function updateCart(catId: number, quantity: number): Promise<void> {
  try {
    const cartId = localStorage.getItem('cartId')

    await axios.put(`${baseUrl}/api/cart/${cartId}`, {
      catId,
      quantity
    })
  } catch (e) {
    console.error('Unable to update cart', e)

    throw new Error('Unable to upate cart')
  }
}
