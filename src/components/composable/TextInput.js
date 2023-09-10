
import { ref, watch } from "vue"
export let writeStorage=(key, val)=>{

   

    const input=ref(val);
    if(val==null){
        input.value = '';
    }

    if(sessionStorage.getItem(key)){
        input.value = sessionStorage.getItem(key);
    }else if(val){
        sessionStorage.setItem(key, val);
    }
    watch(input, (newval)=>{
        write(key, newval);
    });
    const write=(key, val)=>{
        sessionStorage.setItem(key, val);
    }
    return input
}

export const search = (query, searchBy, data) => {
   
    query.value= query.value.trim();
    if (query.value==''||query.value==null) {
      return [];
    }
    const record = ref([]);
   
    watch(query, (newval)=>{
        
        record.value= data.value.filter(item => item[searchBy].toLowerCase().includes(query.value));
        console.log("The input has changed", newval);
    });

    watch(record, (newval)=>{
        console.log(newval);
    });

    return record;
     
 };
export let  updateInhouse = (val)=>{
    const updatedDatafromApi = ref(val);
    console.log("i am in updateinhouse")
    watch(updatedDatafromApi, (newval)=>{
        console.log("Response found",newval);
    });
    return updatedDatafromApi;

 }