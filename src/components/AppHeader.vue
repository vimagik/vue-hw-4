<script setup>
const searchStr = defineModel()
</script>


<template>
    <v-app-bar>
        <v-app-bar-title>Супер-пупер магазин</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-text-field class="mt-4 mr-4" prepend-icon="mdi-magnify" density="compact" variant="outlined" max-width="300"
            v-model="searchStr"></v-text-field>
    </v-app-bar>
</template>