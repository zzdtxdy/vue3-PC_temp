<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  watch ,
  onMounted,
  getCurrentInstance
} from 'vue'


const emit = defineEmits([""])
const props = defineProps({
  propData: {
    type: String,
    default: ''
  },
})
//const { } = toRefs(props);


const { data } = toRefs(
  reactive({
    //定义数组和对象
    data: "",
  })
);
</script>
