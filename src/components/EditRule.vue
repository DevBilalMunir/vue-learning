<template>
  <div class="card">
    <InputText
      v-model="input"
      placeholder="Search Id"
      @keyup="handleInput"
      @keydown.enter=""
      :maxlength="5"
    />
    <Button label="Edit" @click="handleSubmit"/>
    <Divider />
    <div v-if="record.length > 0 && input.length > 0">
    <h3>Available Ids</h3>
      <Listbox
        @onslect="console.log('selected')"
        :options="record"
        optionLabel="id"
        class="w-full md:w-12rem"
        listStyle="max-height:250px"
      >
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option.id }}</div>
          </div>
        </template>
      </Listbox>
    </div>
    <div v-else-if="record.length <= 0"> No Rule Found</div>
   
  
  </div>
</template>

<script setup>
import { inject, ref, onMounted, provide } from "vue";
import { writeStorage, search } from "@/components/composable/TextInput";
import { useDialog } from "primevue/usedialog";
import UpdateRule from "@/components/UpdateRule.vue";
const dialog = useDialog();
const data = inject("data");
const dialogRef =inject("dialogRef");
import { useToast } from "primevue/usetoast";
const toast = useToast();
const searchData = ref([]);
const result = ref([]);
const input = ref("12345");
const record = search(input, "id", data);
const handleInput = (event) => {
  const numericInput = event.target.value.replace(/\D/g, "");
  input.value = numericInput;
};
// provide("result", result)
provide("record", record);
const handleSubmit = () => {
  result.value = record.value.filter(
    (item) => item.id.toLowerCase() === input.value.toLowerCase()
  );

  if (result.value.length == 1) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Record found",
      life: 3000,
    });
   dialog.open(UpdateRule, {
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
      },
      data: {
            result: result.value,
        },
       onClose: (options) => {
        if(options.data && options.data.error){
      const error = options.data.error;
      console.log(error);}
    },
       
    
  });
 
  } else if (result.value.length > 1) {
    toast.add({
      severity: "warn",
      summary: "Warn",
      detail: "Duplicate record found",
      life: 3000,
    });


  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Record not found",
      life: 3000,
    });
  }
};

onMounted(() => {
  input.value = "";
});
</script>

<style></style>
