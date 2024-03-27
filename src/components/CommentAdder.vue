<template>
  <!-- comment form -->
  <div
    class="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg"
  >
    <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
      <div class="flex flex-wrap -mx-3 mb-6">
        <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
        <div class="w-full md:w-full px-3 mb-2 mt-2">
          <input
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
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
export default {
  props: ["document_id"],
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    submit() {
      console.log(this.comment);
      this.$emit("submit", this.comment);
      console.log(this.comment);

      this.postCommentById(this.comment, this.document_id)
      //     const commentToAdd = {author_id: (user_id),
      //     content: this.comment,
      //   article_id:(from article_id),
      // created_at: Date.now()}
      //Form comment object to post to database
      // Structure for comment to add: {comment_id, author: (from user_id), content: this.comment, article_id:(from article_id), created_at: Date.now()}
      //axios request to post comment to database
      this.comment = "";
    },

    async postCommentById(comment,document_id) {
      try {
        const postBody = {
          author: 2,
          content: this.comment,
          created_at: Date.now(),
          document_id: document_id
        };
        const { data } = await axios.post(
          `http://localhost:8000/documents/${document_id}/comments`, postBody
        );
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
