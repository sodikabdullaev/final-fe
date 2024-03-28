<template>
 <CommentButton class="comment-btn" @click="toggleForm"></CommentButton>
    <CommentAdder v-if="isFormVisible" :document_id="document_id" :comments="comments" @submit-form="receiveEmit"></CommentAdder>
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
import CommentAdder from "./CommentAdder.vue";
import CommentButton from "./CommentButton.vue";
import axios from "axios";


import { store } from "../store";
import { useState } from "../compostibles/state";
import {ref, defineComponent, watchEffect } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";



const comments = ref({})
const isFormVisible = ref(false)


export default {

  props: ["data", "document_id"],
  data() {
    return {
      comments: comments,
      store: store,
      isFormVisible
    };
  },
  components: {
    CommentCard,
    CommentAdder,
    CommentButton
  },

  methods: {

    receiveEmit() {
      this.toggleForm()
      // console.log(commentsCopy)
    },

    toggleForm() {
     
      isFormVisible.value = !isFormVisible.value

    },
    seeComments() {
      console.log(comments);
    },


    async getAllComments() {
      console.log('hello in all comments')
      try {
        const { data } = await axios.get(
          "http://localhost:8000/documents/1/comments "
        );
        store.comments = data;

      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeMount() {
    // console.log('this is before mount')
    // axios
    //   .get(`http://localhost:8000/documents/1/comments`)
    //   .then(({ data }) => {
    //     console.log(data)
    //     // setCommentList(data)
    //     store.comments = data
    //     // console.log(store.comments)
    //     console.log(this.comments)
  
    //   })
    //   .catch((err) => console.log(err));
  },
  mounted() {
    console.log('comments are mounted')
    console.log(comments.value)
    axios
      .get(`http://localhost:8000/documents/${this.document_id}/comments`)
      .then(({ data }) => {
        console.log(data)
        comments.value = data
        console.log(comments.value)

  
      })
      .catch((err) => console.log(err));
  },
  beforeUpdate() {
  // console.log(store.comments, "before update")
  //   axios
  //     .get(`http://localhost:8000/documents/${this.document_id}/comments`)
  //     .then(({ data }) => {
  //       console.log(data)
  //       // setCommentList(data)
  //       store.comments = data
  //       // console.log(store.comments)
  
  //     })
  },

  watch: {
    comments: {
      handler() {
        console.log('in watcher')
        this.getAllComments()
        isFormVisible.value = false
      },
      immediate: true,
    },
  },
};

</script>
