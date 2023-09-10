<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>

  <RouterView />
</template>

<style scoped></style>
