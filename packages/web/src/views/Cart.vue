<template>
  <div class="home">
    <NavBar />
    <b-container>
      <b-row class="mx-5">
        <b-col cols="auto" class="my-1">
          <h1 class="table-caption font-weight-bold">Cart</h1>
        </b-col>
      </b-row>
      <b-row id="cart-header" class="my-3">
        <b-col sm="4">Image</b-col>
        <b-col sm="2">Cat</b-col>
        <b-col sm="3">Quantity</b-col>
        <b-col sm="1">Price</b-col>
        <b-col sm="2">Total</b-col>
      </b-row>
      <hr />
      <div v-if="cart.length > 0">
        <CartRow v-for="catId in cart" :key="catId" :cat-id="catId" />
      </div>
      <div v-else>
        <b-row>
          <b-col cols="12" class="font-weight-bold">No cats in cart.</b-col>
        </b-row>
      </div>
      <hr />
      <b-row>
        <b-col sm="10" class="text-right">
          Shipping:
        </b-col>
        <b-col sm="2">${{ shipping.toFixed(2) }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="10" class="text-right">
          Subtotal:
        </b-col>
        <b-col sm="2">${{ subtotal.toFixed(2) }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="10" class="text-right">
          Tax:
        </b-col>
        <b-col sm="2">${{ tax.toFixed(2) }}</b-col>
      </b-row>
      <hr />
      <b-row class="font-weight-bold mb-3">
        <b-col sm="10" class="text-right">
          Total:
        </b-col>
        <b-col sm="2">${{ total.toFixed(2) }}</b-col>
      </b-row>
      <b-row class="mr-4">
        <b-col cols="12">
          <div class="float-right">
            <b-button variant="danger" class="m-2" @click="cancelOrder">Clear</b-button>
            <b-button :disabled="cart.length < 1" class="m-2" @click="order">Order</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">Cart</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import store from '../store/store'
import { Cat } from '../types/Cat'

@Component({
  components: {
    NavBar: () => import(/* webpackChunkName: "nav-bar" */ '@/components/NavBar.vue'),
    CartRow: () => import(/* webpackChunkName: "cart-row" */ '@/components/CartRow.vue')
  }
})
export default class Cart extends Vue {
  cancelOrder() {
    store.commit('cancelOrder')
  }

  get cart() {
    const cartCatIds = new Set()

    for (let catId of store.state.cart) {
      cartCatIds.add(catId)
    }

    return Array.from(cartCatIds)
  }

  get shipping() {
    return store.getters.cartSize * 10
  }

  get subtotal() {
    let cartTotal = 0
    const cats = store.state.cats

    for (let catId of store.state.cart) {
      const cat = cats.find((c: Cat) => c.id === catId)

      if (cat) {
        cartTotal += cat.dailyPrice
      } else {
        console.error('Unable to locate cat with id: ', catId)
      }
    }

    return cartTotal + this.shipping
  }

  get tax() {
    return this.subtotal * 0.0857
  }

  get total() {
    return this.subtotal + this.shipping + this.tax
  }

  order() {
    this.$bvModal
      .msgBoxConfirm(`Submit order for ${store.getters.cartSize} cats, totaling $${this.total.toFixed(2)}?`, {
        title: 'Confirm Order',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        if (value) {
          store.dispatch('order')
        }
      })
  }
}
</script>

<style lang="scss" scoped>
#cart-header {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
