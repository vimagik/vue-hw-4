<script setup>
import { ref, watch, onMounted } from 'vue'

const data = ref(null)
const error = ref(null)
const filteredData = ref(null)
const searchStr = ref(null)
const minPrice = ref(0)
const maxPrice = ref(1000)
const rangePrice = ref([minPrice.value, maxPrice.value])

watch([searchStr, () => rangePrice.value], ([newStr, newRange]) => {
  if (!newStr) {
    filteredData.value = data.value.filter(
      product => product.price >= newRange[0] && product.price <= newRange[1]
    )
  }
  else {
    filteredData.value = data.value.filter(
      product => product.title.indexOf(newStr) > -1 && product.price >= newRange[0] && product.price <= newRange[1]
    )
  }
})

const dialog = ref(false)
const userName = ref('')

onMounted(() => {
  userName.value = localStorage.getItem("user")

  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
      data.value = json
      filteredData.value = json
    })
    .catch((err) => (error.value = err))
})

const shopCart = ref({})

const addPurchase = function (productId) {
  const product = data.value.find((el) => el.id === productId)
  if (shopCart.value.hasOwnProperty(productId)) {
    shopCart.value[productId].amount += 1
  } else {
    shopCart.value[productId] = {
      amount: 1,
      title: product.title,
      price: product.price,
    }
  }
  dialog.value = true
}

const getAmountCart = function (productId) {
  return shopCart.value.hasOwnProperty(productId) ? shopCart.value[productId].amount : 0
}
</script>

<template>
  <v-container fluid>
    <AppHeader v-model="searchStr" v-model:cart="shopCart" />
    <v-progress-linear v-if="!data" class="mt-3" color="cyan" indeterminate></v-progress-linear>
    <v-row v-else class="mt-3">
      <v-col cols="2">
        <ProductCardSearch v-model="searchStr" v-model:range-price="rangePrice" :minPrice="minPrice"
          :maxPrice="maxPrice" />
      </v-col>
      <v-col>
        <v-row class="d-flex justify-center ">
          <ProductCard class="mt-5" v-for="product in filteredData" :key="product.id" :product-data="product"
            :shopCart="getAmountCart(product.id)" @buy="addPurchase(product.id)" />
        </v-row>
      </v-col>
    </v-row>
    <PurchaseConfirm v-model="dialog" />
  </v-container>
</template>
