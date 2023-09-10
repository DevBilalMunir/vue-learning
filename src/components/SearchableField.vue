<template>
    <div class="card flex justify-content-center">
        <form @submit="onSubmit" class="flex flex-column gap-2">
            <label for="ac">Value</label>
            <AutoComplete v-model="value" :inputClass="{ 'p-invalid': errorMessage }" inputId="ac" :suggestions="items" @complete="search" aria-describedby="ac-error" />
            <small class="p-error" id="ac-error">{{ errorMessage || '&nbsp;' }}</small>
            <Button type="submit" label="Submit" />
        </form>
           <Toast />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField('value', validateField);
const toast = useToast();
const items = ref([]);
const data = inject("data");

function validateField(value) {
    if (!value) {
        return 'Value is required.';
    }

    return true;
}

const onSubmit = handleSubmit((values) => {
    values.value = values.value.trim();
    if (values.value && values.value.length > 0 ) {
       
        console.log(values.value);
    }
    else {
        console.log("error")
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a value', life: 3000 });
        resetForm();
    }
});

const search = (event) => {
    console.log(event)
    let records = [];
    records = data.value.filter(item => item.id.toLowerCase().includes(event.query));
    let ids=[];
    records.forEach(item => {
        console.log(item.id);   
        ids.push(item.id);
    });
    items.value = ids;
};


</script>
