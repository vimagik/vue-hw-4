<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const searchStr = defineModel()
const cart = defineModel('cart')

const route = useRoute();

const productAmmount = computed(() => {
    return Object.entries(cart.value).reduce((accumulator, currentValue) => accumulator + currentValue[1].amount, 0)
})
</script>


<template>
    <v-app-bar>
        <v-app-bar-title>Супер-пупер магазин</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-text-field v-if="route.path === '/'" class="mt-4 mr-4" prepend-icon="mdi-magnify" density="compact"
            variant="outlined" max-width="300" v-model="searchStr"></v-text-field>
        <v-btn to="/">Главная</v-btn>
        <v-btn class="ml-2" to="/login">Войти</v-btn>
        <v-badge v-if="route.path === '/'" :content="productAmmount" :dot="productAmmount === 0" inline>
            <v-btn color="indigo" icon="mdi-cart-variant"></v-btn>
        </v-badge>
    </v-app-bar>
</template>