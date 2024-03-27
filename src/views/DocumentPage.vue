<template>
  <div class="relative md:flex h-screen overflow-hidden py-10 min-w-fit">
    <CommentButton class="comment-btn" @click="showForm"></CommentButton>
    <CommentAdder v-if="store.isFormVisible" :document_id="document_id"></CommentAdder>
   
    
    <MyEditor />

   
    <div
      class="comment flex-1 p-10 h-screen overflow-y-auto min-w-fit"
    >
      <Comments :document_id="document_id"></Comments>
   
    </div> 

    </div> 
 
</template>

<script>
import MyEditor from "../components/MyEditor.vue";
import CommentAdder from "../components/CommentAdder.vue";
import Comments from "../components/Comments.vue";
import CommentButton from "../components/CommentButton.vue";
import { store } from "../store";
import { watch } from "vue";
// import { useRoute } from "vue-router";

// const route = useRoute()

store.isFormVisible = false


// watch(() => route.params.id, (newId, oldId) => {
//   store.document = newId
//   console.log(store.document)
// })

export default {
  components: {
    MyEditor,
    Comments,
    CommentButton, 
    CommentAdder
  },
  data() {
    return {
      posts: Array,
      store: store,
      document_id: this.$route.params.id
    };
  },
  methods: {
    showForm() {
      console.log(store.isFormVisible);
      store.isFormVisible = true;
      // state.isButtonVisible = false;

      console.log(store.isFormVisible);
    },
  },



};
</script>
