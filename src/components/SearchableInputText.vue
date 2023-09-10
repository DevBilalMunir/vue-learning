<template>
  <div class="card">
    <!-- Move the <Toast /> component here if it's intended to be shown globally -->
    <h1>This is Dialog Box</h1>
   
      <InputText v-model="input" placeholder="Search Id" @keydown.enter="console.log('enter')" />

   <p v-for="item in props.data" :key="item.id">{{ item.id }}</p>
  </div>
</template>

<script setup>
import { inject, ref, defineProps, onBeforeMount } from "vue";
import { writeStorage, search } from "@/components/composable/TextInput";

// const data = inject("data");
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const searchData = ref([]);
const input = writeStorage("schema");
const record = search(input, "id", props.data);
const props = defineProps({
  title: String,
  likes: Number,
  data: ref,
})

onBeforeMount(() => {
  console.log(props.title);
  console.log(props.likes);
  console.log(props.data)
});
</script>

<style></style>
