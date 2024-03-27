<template>
  <div class="relative md:flex h-screen overflow-hidden py-10 min-w-fit">
    <CommentButton class="comment-btn" @click="showForm"></CommentButton>
    <CommentAdder v-if="store.isFormVisible"></CommentAdder>
   
    
    <MyEditor />

   
    <div
      class="comment flex-1 p-10 h-screen overflow-y-auto min-w-fit"
    >
      <Comments></Comments>
   
    </div> 
    </div> 
 
</template>

<script>
import MyEditor from "../components/MyEditor.vue";
import CommentAdder from "../components/CommentAdder.vue";
import Comments from "../components/Comments.vue";
import CommentButton from "../components/CommentButton.vue";
import { store } from "../store";

store.isFormVisible = false

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
      store: store
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
