<template>
  <div class="comment-section">
    <ul  ref="comment-section"  v-for="comment in comments" >
          <CommentCard class="comment" :key="comment.id" :name="comment.id" :body="comment.body"></CommentCard>
    
    </ul>
  </div>

  

  
  </template>
  
  <script>
  import CommentCard from "./CommentCard.vue";

  export default {
      props: ['data'],
    data() {
      return {
        comments: [
          { id: 1, body: "hello this is comment 1", section:'data' },
          { id: 2, body: "comment2 body", section: 'data' },
          { id: 3, body: "comment3 body", section: 'data' },
          { id: 4, body: "comment4 body", section: 'data' },
          { id: 5, body: "comment5 body", section: 'data' },
          { id: 6, body: "comment6 body", section: 'data' },
          { id: 7, body: "comment7 body", section: 'data' },
          { id: 8, body: "comment8 body", section: 'data' },
          { id: 9, body: "comment9 body", section: 'data' },
      ],
      
  
        
      }
  },
  components: {
    CommentCard
  }
  };
  </script>