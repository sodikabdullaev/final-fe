<template>
  <!-- comment form -->
  <div
    class="flex mx-auto items-center justify-center shadow-lg mt-5 mx-8 mb-10 max-w-lg w-64 comment-btn "
  >
    <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
      <div class="flex flex-wrap -mx-3 mb-6">
        <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
        <div class="w-full md:w-full px-3 mb-2 mt-2">
          <input
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            ref="content"
            name="body"
            placeholder="Type Your Comment"
            type="text"
            v-model="comment"
            required
          />
        </div>
        <div class="w-full md:w-full flex items-start md:w-full px-3">
          <button
            class="-mr-1 bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
            @click.prevent="submit"
          >
            Post Comment
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";
import { useState } from '../compostibles/state'





export default {
  props: ["id", "comments"],
  data() {
    return {
      comment: "",
      
    };
  },
  methods: {
    submit() {
      console.log(this.comment);
      
      const commentToAdd = {
        author: "testuser2",
        content: this.comment,
        created_at: 1711624845212,
        document_id: "id",
      };
      
      const commentsCopy = [commentToAdd, ...this.comments]
      console.log(commentToAdd, commentsCopy)
      console.log(this.comments)
      this.comments.push(commentToAdd)
      
      this.$emit("submit-form", commentToAdd);

      // this.comments = [commentToAdd, commentsCopy]
      this.postCommentById(this.id, commentsCopy);
      
      this.comment = "";
    },

    async postCommentById(id, commentsCopy) {
      try {
        const postBody = {
          author: "testuser2",
          content: this.comment,
          created_at: Date.now(),
          id: id,
        };
        const { data } = await axios.post(
          `http://localhost:8000/documents/${id}/comments`,
          postBody
        );
        console.log(data);
        store.comments = [data, commentsCopy]
  

      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
