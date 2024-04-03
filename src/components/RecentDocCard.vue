<template>
  <li v-if="doc">
    
                    
<router-link :to="{ path: `/document/${doc.id}` }"
      href="/documents/{{}}"
      class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

      <span class="flex-1 ms-3 whitespace-nowrap">{{doc.title}}</span>
      <p class="text-xs text-gray-500">Created {{timeAgoString}}</p>
     
      </router-link
                      >
  </li>
</template>

<script setup>

//text-xs font-normal text-gray-500
import { onMounted, ref } from 'vue';
import { timeAgo } from '../compostibles/functions.js'



const props = defineProps({
  doc: Object,
});



const documentDate = props.doc.created_at
const date = new Date(documentDate);
const timeAgoString = timeAgo(date);


</script>

