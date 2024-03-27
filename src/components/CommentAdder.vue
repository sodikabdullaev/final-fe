<template >
    <form class="comment-form" >
        <label for="comment">Add a comment:</label>
        <input id="comment" type="text" v-model="comment"  required>
        <br>
        <button @click.prevent="submit" > Post </button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.comment)
      console.log(this.comment)
      //Form comment object to post to database
      // Structure for comment to add: {comment_id, author: (from user_id), content: this.comment, article_id:(from article_id), created_at: Date.now()}
      //axios request to post comment to database
      this.comment = ''
    }
  }
}
</script>