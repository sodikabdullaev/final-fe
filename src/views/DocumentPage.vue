<template>
  <div class="relative md:flex h-screen overflow-hidden py-10 min-w-fit">

     <div class="wrapper">
    <MyEditor v-if="state.document" :content="state.document.content" :title="state.document.title"/>
        <!-- <h2>{{ isNewDocument ? 'New Document' : 'Existing Document' }}</h2> -->

    
    <!-- <h3>{{ id || 'No id passed yet' }}</h3> -->
    <!-- <h4>{{ title || 'no title'}}</h4> -->
  </div>
    <div
      class="comment flex-1 p-10 h-screen overflow-y-auto min-w-fit"
    >
      <Comments :id="id" :isNewDocument="isNewDocument"></Comments>
    </div> 
    </div> 
  

</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import MyEditor from "../components/MyEditor.vue";
import CommentAdder from "../components/CommentAdder.vue";
import Comments from "../components/Comments.vue";
import CommentButton from "../components/CommentButton.vue";
import { store } from "../store";
import axios from 'axios';
import { watch } from "vue";
import { v4 as uuidv4 } from "uuid";


store.isFormVisible = false
// store.documentExists = true


const route = useRoute()
const router = useRouter()
console.log(route.newDocument, "<<<route")
console.log(route.params.id)
const docId = route.params.id
const isNewDocument = route.query.isNewDocument === 'true';
const document = ref(null);



const props = defineProps({
  id: {
    type: String,
    required: false
  },

});


store.isFormVisible = false



const state = reactive({
  document: null,
  async setDocument() {
    try {
      if (!isNewDocument) {
        const response = await fetch(`http://localhost:8000/documents/${route.params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        state.document = data;
      } else {
        state.document = {};
        state.document.content = ''
        state.document.title = 'New Document'
        
        
      }
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    }
  },
});




  onMounted(async () => {
  await state.setDocument();
  console.log(state.document.content, "<<doc mount")
});
      
      
    </script>



