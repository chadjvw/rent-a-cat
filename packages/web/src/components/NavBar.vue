<template>
  <b-navbar type="dark" variant="primary" class="navbar-static-top mb-3">
    <b-container fluid>
      <b-navbar-brand id="nav-brand" :to="{ name: 'home' }">
        Rent-A-Cat
      </b-navbar-brand>
      <b-navbar-nav align="right">
        <b-nav-item>
          <b-button size="sm" variant="light" class="my-2 my-sm-0" :to="{ name: 'home' }"
            ><font-awesome-icon icon="cat" /> Cats</b-button
          >
          <b-button size="sm" variant="light" class="m-2 my-sm-0" :to="{ name: 'cart' }">
            <font-awesome-icon icon="shopping-cart" />Cart <b-badge>{{ cartSize }}</b-badge></b-button
          >
          <b-button size="sm" variant="danger" class="my-2 my-sm-0" type="submit" @click="newCart">New Cart</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '../store/store'

@Component({})
export default class NavBar extends Vue {
  newCart() {
    store.commit('clearCart')

    store.dispatch('newCart')

    this.$router.push('/')
  }

  get cartSize() {
    return store.getters.cartSize
  }
}
</script>

<style lang="scss" scoped>
#nav-brand {
  font-weight: bold;
  font-size: 1.5em;
}
</style>
