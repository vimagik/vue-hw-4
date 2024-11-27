<script setup>
import { useRoute } from 'vue-router'

const searchStr = defineModel()
const route = useRoute();
</script>


<template>
    <v-app-bar>
        <v-app-bar-title>Супер-пупер магазин</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-text-field v-if="route.path === '/'" class="mt-4 mr-4" prepend-icon="mdi-magnify" density="compact"
            variant="outlined" max-width="300" v-model="searchStr"></v-text-field>
        <v-btn to="/">Главная</v-btn>
        <v-btn class="ml-2" to="/login">Войти</v-btn>
    </v-app-bar>
</template>