<template>
<Toast/>
  <div class="card">
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Id</label>
      </span>
      <InputText :value="id" placeholder="Username" :disabled="true" />
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Schema Id</label>
      </span>
      <InputMask
        label="Schema_Id:"
        v-model="schema"
        mask="********-****-****-****-************"
        placeholder="Enter Schema Id"
      />
    </div>
    <Divider />
    <!-- <Divider/> -->
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Discription:</label>
      </span>
      <Textarea v-model="desc" :value="desc" rows="5" cols="86" />
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Regex</label>
      </span>
      <InputText type="text" v-model="reg" />
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Partner Name</label>
      </span>
      <InputText type="text" v-model="partner" />
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Load Type</label>
      </span>
      <InputText type="text" v-model="load" />
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <label>Frequency</label>
      </span>
      <InputText type="text" v-model="frequency" />
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup flex-1"> Died Engine </span>

      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton v-model="deid_engine" value="n/a" />
          <label for="ingredient1" class="ml-2">N/A</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="deid_engine" value="datavant" />
          <label for="ingredient2" class="ml-2">Datavant</label>
        </div>
      </div>
    </div>
    <Divider />
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup flex-1"> Readiness </span>

      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton v-model="readiness" value="Production" />
          <label for="ingredient1" class="ml-2">Production</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="readiness" value="Integration" />
          <label for="ingredient2" class="ml-2">Integration</label>
        </div>
      </div>
    </div>
    <Divider />
    <div class="flex flex-wrap gap-3 justify-content-end">
      <Button label="Update" @click="handleConfirm" />
      <Button label="Back" @click="closeDialog({ buttonType: 'Back' })" text />
    </div>
  </div>
</template>
<script setup>
import { inject, ref, onMounted, watch, onUnmounted } from "vue";
import { writeStorage, updateInhouse } from "@/components/composable/TextInput";
import DatanatorService from "@/components/DatanatorService.js";
import { useDialog } from "primevue/usedialog";
import ConfirmationView from "@/components/ConfirmationView.vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const dialog = useDialog();
const data = inject("data");
const dialogRef = inject("dialogRef");
const record = dialogRef.value.data.result;
const schema = writeStorage("schema_id");
const id = writeStorage("id");
const desc = writeStorage("description");
const reg = writeStorage("regex");
const partner = writeStorage("partner");
const load = writeStorage("load_type");
const catagor = writeStorage("catagor");
const frequency = writeStorage("frequency");
const deid_engine = writeStorage("deid_engine");
const readiness = writeStorage("readiness");
const status = writeStorage("status");
const fromAPI = ref(null);
const closeDialog = (e) => {
  dialogRef.value.close(e);
};
const handleConfirm = () => {
  console.log("update");
  dialog.open(ConfirmationView, {
    props: {
      header: "Confirmation",
      style: {
        width: "50vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
    onClose: (options) => {
      const data = options.data;
      console.log(data);
      if (data.buttonType == "Yes") {
        console.log("update");
        console.log(payload());
        updateData();
        //
      } else if (data.buttonType == "No") {
        console.log("Not update");
        dialogRef.value.close();
      }
    },
  });
};
onMounted(() => {
  let rawdata = Object.values(record[0]);
  id.value = rawdata[0];
  schema.value = rawdata[1];
  console.log(schema.value);
  desc.value = rawdata[2];
  console.log(desc.value);
  catagor.value = rawdata[3];
  reg.value = rawdata[4];
  partner.value = rawdata[5];
  load.value = rawdata[6];
  frequency.value = rawdata[7];
  console.log(frequency.value);
  deid_engine.value = rawdata[8];
  readiness.value = rawdata[9];
  status.value = rawdata[10];
});

const payload = () => {
  return {
    body: {
      schema_id: schema.value,
      description: desc.value,
      regex: reg.value,
      partner: partner.value,
      load_type: load.value,
      category: catagor.value,
      frequency: frequency.value,
      deid_engine: deid_engine.value,
      readiness: readiness.value,
      status: status.value,
    },
    id: id.value,
  };
};

async function updateData() {
  try {
    const response = await DatanatorService.upadateRule(payload());
    fromAPI.value = response;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.response.data
    });
    // dialogRef.value.close(error.response.data);
    
  }
}
watch(fromAPI, (newValue, oldValue) => {
  if (newValue != null) {
    dialogRef.value.close();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Record updated",
      life: 3000,
    });
  }
});
onUnmounted(() => {
  console.log("unmounted");
  console.log(fromAPI.value);
  console.log("Data is:", data.value);
  const index = data.value.findIndex((item) => {
    return item.id.toLowerCase() === fromAPI.value.id.toLowerCase();
  });

  if (index !== -1) {
    console.log("item found at index:", index);
     data.value[index]=fromAPI.value;
    console.log("updated data:", data.value);
  } else {
    console.log("Item not found in data.value");
  }
});

</script>
