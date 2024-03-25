<template>
  <div class="border-b">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Edit Page</h1>
    </div>
  </div>
  <AnnotateButton></AnnotateButton>
  <CommentButton @click="store.makeVisible()"></CommentButton>
  <QuillEditor
    v-model:content="textData"
    content-type="html"
    v-model="content"
    ref="quillEditor"
    :options="options"
    id="editor"
    @selection-change="handleChange"
    on
  />
  <Comments v-bind:data="selected"></Comments>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import CommentButton from "../components/CommentButton.vue";
import AnnotateButton from "../components/AnnotateButton.vue";
import Comments from "../components/Comments.vue";
import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
  isVisible: false,
  makeVisible() {
    console.log(isVisible);
    this.isVisible = true;
  },
  makeInvisible() {
    this.isVisible = false;
  },
});

export default {
  components: {
    QuillEditor,
    CommentButton,
    AnnotateButton,
    Comments,
  },
  data() {
    return {
      content: "",
      delta: undefined,
      selected: {},
      position: 0,
      textData: "",
      options: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"],
          ],
        },
        placeholder: "Start typing...",
        readOnly: false,
        theme: "snow",
      },
    };
  },
  watch: {
    content() {
      this.delta = this.$refs.myQuillEditor.quill.getContents();
      console.log(this.delta, "<<<<this.delta");
    },
  },
  methods: {
    async getDocumentContent() {
      const { data } = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      this.textData = data.disclaimer;
    },

    handleChange(range, oldRange, source) {
      if (range) {
        if (range.range["length"] === 0) {
          console.log("User cursor is on", range.range["index"]);
        } else {
          const text = this.$refs.quillEditor
            .getText(range.range["index"], range.range["length"])
            .trim();
          console.log("User has highlighted", text);
          this.selected.text = text;
        }
      } else {
        console.log("Cursor not in the editor");
      }
      console.log(this.selected);
    },
  },
  mounted() {
    this.getDocumentContent();
  },
};
</script>
