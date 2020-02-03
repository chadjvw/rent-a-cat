<template>
  <b-row>
    <b-col sm="4"><b-img-lazy thumbnail fluid :src="cat.image"/></b-col>
    <b-col sm="2">{{ cat.type }}</b-col>
    <b-col sm="3">
      <b-input-group>
        <b-input-group-prepend>
          <b-button variant="outline-info" @click="moreCats">More Cats</b-button>
        </b-input-group-prepend>
        <b-form-input v-model="quantity" type="number" min="0" readonly></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-secondary" @click="lessCats">Less Cats</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-col>
    <b-col sm="1">${{ cat.dailyPrice.toFixed(2) }}</b-col>
    <b-col sm="2">${{ total }}</b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import store from '../store/store'
import { Cat } from '../types/Cat'

@Component({})
export default class EnvironmentInfo extends Vue {
  @Prop(Number)
  private catId!: number
  private quantity: number
  private cat: Cat

  constructor() {
    super()

    this.cat = store.getters.getCat(this.catId)

    this.quantity = store.getters.cart.filter((c: number) => c === this.catId).length
  }

  get total() {
    const price = this.cat.dailyPrice * this.quantity

    return price.toFixed(2)
  }

  moreCats() {
    this.quantity += 1
  }

  lessCats() {
    if (this.quantity >= 0) {
      this.quantity -= 1
    }
  }

  @Watch('quantity')
  async updateQuantity(newQuantity: number, oldQuantity: number) {
    if (newQuantity > oldQuantity) {
      await store.dispatch('rent', this.catId)
    } else if (oldQuantity > newQuantity) {
      await store.dispatch('unRent', this.catId)
    } else {
      // nothing happened
    }
  }
}
</script>
