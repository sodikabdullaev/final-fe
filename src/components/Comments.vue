<template>
  <CommentButton class="comment-btn" @click="toggleForm"></CommentButton>
  <CommentAdder
    v-if="isFormVisible"
    :document_id="document_id"
    :comments="comments"
    @submit-form="receiveEmit"
    class = "z-100"
  ></CommentAdder>
  <div class="comment-section z-0">
    <div
      class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg optimistic-render w-64"
      v-if="tempCommentVisible"
    >
      <div class="relative w- flex gap-4 ">
        <li>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
            alt=""
            loading="lazy"
          />
          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
              <p
                class="relative text-xl whitespace-nowrap truncate overflow-hidden"
              >
                {{ temporaryComment.author }}
              </p>
              <a class="text-gray-500 text-xl" href="#"
                ><i class="fa-solid fa-trash"></i
              ></a>
            </div>
            <p class="text-gray-400 text-sm">
              {{ temporaryComment.created_at }}
            </p>
          </div>
        </li>
      </div>
      <p class="-mt-4 text-gray-500 w-80">{{ temporaryComment.content }}</p>
    </div>
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
import { ref } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

const comments = ref({});
const isFormVisible = ref(false);
const tempCommentVisible = ref(false);

export default {
  props: ["data", "document_id"],
  data() {
    return {
      comments: comments,
      store: store,
      isFormVisible,
      temporaryComment: {},
    };
  },
  components: {
    CommentCard,
    CommentAdder,
    CommentButton,
  },

  methods: {
    receiveEmit(commentToAdd) {
      this.toggleForm();
      this.temporaryComment = commentToAdd;
      tempCommentVisible.value = true;
      
    },

    toggleForm() {
      isFormVisible.value = !isFormVisible.value;
    },
    seeComments() {
      console.log(comments);
    },

    async getAllComments() {
      console.log("hello in all comments");
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
  mounted() {
    console.log("comments are mounted");
    console.log(comments.value);
    axios
      .get(`http://localhost:8000/documents/${this.document_id}/comments`)
      .then(({ data }) => {
        console.log(data);
        comments.value = data;
        console.log(comments.value);
      })
      .catch((err) => console.log(err));
  },

  watch: {
    comments: {
      handler() {
        this.getAllComments();
        isFormVisible.value = false;
      },
      immediate: true,
    },
  },
};
</script>
