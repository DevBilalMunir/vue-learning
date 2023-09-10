<script setup>
import SearchableInputText from '@/components/SearchableInputText.vue';
import {ref} from 'vue'
const data = ref([]);
data.value=["a","b","c"];

</script>


<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SearchableInputText title="about title" likes=10 :data="{data}" />
  </div>
</template>

<style></style>
