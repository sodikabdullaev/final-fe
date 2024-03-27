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

const document_id = 1

export default {
  props: ["data"],
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
      .get(`http://localhost:8000/documents/${document_id}/comments`)
      .then(({ data }) => {
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
