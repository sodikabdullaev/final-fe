<template>
  <div class="comment-section">
    <ul ref="comment-section" v-for="comment in comments">
      <CommentCard
        class="comment"
        :key="comment.id"
        :name="comment.id"
        :content="comment.content"
        :author="comment.author"
        :created_at="comment.created_at"
      ></CommentCard>
    </ul>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
import axios from "axios";
import { isProxy, toRaw } from "vue";
import { store } from "../store";


// import { useRoute } from 'vue-router';

// const route = useRoute();  

// const id = $route.params.id// read parameter id (it is reactive)  

// const document_id = 1



export default {
  props: ["data", "document_id"],
  data() {
    return {
      comments: null,
    };
  },
  components: {
    CommentCard,
  },

  methods: {
    seeComments() {
      console.log(comments);
    },


    async getAllComments() {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/documents/1/comments "
        );

        // let rawData = data;
        // if (isProxy(data)) {
        //   rawData = toRaw(data);
        // }
        // console.log("hello");
        this.comments = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {

   
    axios
      .get(`http://localhost:8000/documents/${this.document_id}/comments`)
      .then(({ data }) => {
        console.log(data)
        
        this.comments = data
      
      })

      .catch((err) => console.log(err));
  },
  watch: {
    comments: {
      handler() {
        this.getAllComments;
      },
      immediate: true,
    },
  },
};
</script>
