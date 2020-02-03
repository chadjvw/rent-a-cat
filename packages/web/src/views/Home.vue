<template>
  <div class="home">
    <NavBar />
    <CatGrid />
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

@Component({
  components: {
    NavBar: () => import(/* webpackChunkName: "nav-bar" */ '@/components/NavBar.vue'),
    CatGrid: () => import(/* webpackChunkName: "cat-grid" */ '@/components/CatGrid.vue')
  }
})
export default class Home extends Vue {
  constructor() {
    super()
  }

  async created() {
    if (!localStorage.getItem('cartId')) {
      store.dispatch('newCart')
    } else {
      await store.dispatch('savedCart')
    }
  }
}
</script>
