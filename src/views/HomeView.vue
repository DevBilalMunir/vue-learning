<script setup>
import { onMounted, defineAsyncComponent } from "vue";
// const DialogBox = defineAsyncComponent(() => import("@/components/DialogBox.vue"));
import EditRule from '@/components/EditRule.vue';
import SearchableField from '@/components/SearchableField.vue';
import { ref, provide, inject } from "vue";
import axios from "axios";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
const dialog = useDialog();
const openDialogs = ref([]); // Keep track of open dialogs
const toast = useToast();
const data = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("src/components/DatanatorRules.json");
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};
const UpdateRule = () => {
 
  const dialogRef = dialog.open(EditRule, {
    props: {
      header: "Update Rule by Id",
      style: {
        width: "50vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    }
     
  });
};

provide("data", data);
</script>

<template>
  <div>
    <h1>This is Home page</h1>
     <div class="card flex justify-content-center">
        <Toast />
        <Button label="Show" @click="show()" />
    </div>
    <Button label="PrimeVue" />
    <div class="card flex justify-content-center">
      <Button label="Edit Rule" icon="pi pi-pencil" @click="UpdateRule" />
      <DynamicDialog />
    </div>

    <SearchableField />
  </div>
</template>
