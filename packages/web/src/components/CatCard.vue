<template>
  <b-card :title="cat.type" :img-src="cat.image" :img-alt="cat.type" img-top>
    <b-card-text>
      {{ cat.description }}
    </b-card-text>
    <b-button class="float-right" @click="rent">Add to Cart! ${{ cat.dailyPrice.toFixed(2) }}</b-button>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Cat } from '../types/Cat'
import store from '../store/store'

@Component({})
export default class EnvironmentInfo extends Vue {
  @Prop(Object)
  private cat!: Cat

  constructor() {
    super()
  }

  async rent() {
    await store.dispatch('rent', this.cat.id)
  }
}
</script>
