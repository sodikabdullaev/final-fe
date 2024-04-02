<template>
  <div class="relative md:flex h-screen overflow-hidden py-10 min-w-fit">

     <div class="wrapper">
    <MyEditor v-if="state.document" :content="state.document.content"/>
    <h3>{{ id || 'No id passed yet' }}</h3>
  </div>

    <div
      class="comment flex-1 p-10 h-screen overflow-y-auto min-w-fit"
    >
      <Comments :document_id="document_id"></Comments>
   
    </div> 

    </div> 
 

</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import MyEditor from "../components/MyEditor.vue";
import CommentAdder from "../components/CommentAdder.vue";
import Comments from "../components/Comments.vue";
import CommentButton from "../components/CommentButton.vue";
import { store } from "../store";
import axios from 'axios';
import { watch } from "vue";

store.isFormVisible = false

const route = useRoute()
console.log(route)
console.log(route.params.id)
const docId = route.params.id


const props = defineProps({
  id: {
    type: String,
    required: true


// const route = useRoute()

store.isFormVisible = false

//export default {
//  components: {
 //   MyEditor,
  //  Comments,
 //   CommentButton, 
 //   CommentAdder
 // },
 // data() {
   // return {
    //  posts: Array,
  //    store: store,
  //    document_id: this.$route.params.id
  //  };
  },
  title: {
    type: String,
  }
});

const state = reactive({
  document: null,
  setDocument: async () => {
    try {
      const response = await fetch(`http://localhost:8000/documents/${docId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch document");
      }
      const data = await response.json();
      state.document = data;
      console.log(state.document, "<<<state.doc")
      console.log(data.content, "<<<state.content")
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    }
  },
    

  onMounted(async () => {
  await state.setDocument();
  console.log(state.document.content, "<<doc mount")
});
// onUnmounted(() => {
//   editor.value.commands.setContent({ type: 'ydoc', content: [] });
//     editor.value.destroy();

// });




};
</script>



