
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