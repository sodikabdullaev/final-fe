<template>
  <div class="comment-section" ref="comment-section"  v-for="comment in comments" >
        <CommentCard class="comment" :key="comment.id" :name="comment.id" :body="comment.body" :commentData="commentData" :data="data.text" ></CommentCard>
    
    
</div>
 
    
</template>

<script>
import CommentCard from "./CommentCard.vue";
import { store } from "../views/Edit.vue";
export default {
    props: ['data'],
  data() {
    return {
      comments: [
        { id: 1, body: "comment1 body", section:'data' },
        { id: 2, body: "comment2 body" },
    ],
    

      
    }
},
components: {
  CommentCard
}
};
</script>
