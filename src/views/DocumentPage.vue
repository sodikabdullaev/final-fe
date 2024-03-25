<template>

  <div class="container mx-auto max-w-4xl my-8">
    
    <!-- <form action="" -->
>
      <MyEditor />
      
<!-- </form> -->
   
  </div>
</template>

<script setup>
import MyEditor from '../components/MyEditor.vue'

const props = defineProps({
  posts: Array,
})


</script>
