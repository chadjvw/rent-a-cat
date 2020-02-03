<template>
  <b-container fluid>
    <b-row class="mx-5">
      <b-col cols="auto">
        <h1 class="table-caption font-weight-bold">Cats for Rent</h1>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols="10" />
      <b-col cols="2">
        <b-button @click="fetchCats">
          Refresh
        </b-button>
      </b-col>
    </b-row>
    <b-row v-for="(catRow, index) in catRows" :key="index" class="mb-4 mx-4">
      <b-card-group deck>
        <CatCard v-for="cat in catRow" :key="cat.id" :cat="cat" />
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '../store/store'

@Component({
  components: {
    CatCard: () => import(/* webpackChunkName: "cat-card" */ '@/components/CatCard.vue')
  }
})
export default class CatGrid extends Vue {
  constructor() {
    super()
  }

  get catRows() {
    return chunk(store.getters.cats, 4)
  }

  async fetchCats() {
    if (store.getters.cats.length < 1) {
      await store.dispatch('fetchCats')
    }
  }

  created() {
    this.fetchCats()
  }
}

function chunk(array: any[], size: number) {
  const chunkedArr = []
  let index = 0

  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index))
    index += size
  }

  return chunkedArr
}
</script>
