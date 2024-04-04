<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
    <div class="editor__footer">
      <div :class="`editor__status editor__status--${status}`">
        <template v-if="status === 'connected'">
          {{ editor.storage.collaborationCursor.users.length }} user{{
            editor.storage.collaborationCursor.users.length === 1 ? "" : "s"
          }}
          online in {{ title }}
        </template>
        <template v-else> </template>
      </div>
      <div class="editor__actions">
        <button @click="handleSave()">SAVE</button>
      </div>
      <div class="editor__name">
        <button @click="setName"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import { HocuspocusProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Editor, EditorContent } from "@tiptap/vue-3";
import * as Y from "yjs";
import MenuBar from "./MenuBar.vue";
import { store } from "../store";
import axios from "axios";
store.isFormVisible = false;

const getRandomColor = () => {
  return getRandomElement([
    "#958DF1",
    "#F98181",
    "#FBBC88",
    "#FAF594",
    "#70CFF8",
    "#94FADB",
    "#B9F18D",
  ]);
};

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const currentUser = ref({
  name: JSON.parse(localStorage.getItem("currentUser")).username || "Guest",
  color: getRandomColor(),
});

const status = ref("connecting");

const editor = ref(null);

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,

    required: true,
  },
  id: {
    type: Number,
  },
});

const ydoc = new Y.Doc();
const provider = new HocuspocusProvider({
  url: "ws://127.0.0.1:1234",
  // name: "example-document",
  document: ydoc,
});
provider.on("status", (event) => {
  status.value = event.status;
});

onMounted(() => {
  createEditor();
});

const createEditor = () => {
  editor.value = new Editor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: currentUser.value,
      }),
    ],
    content: props.content,
  });
};

const getContent = () => {
  const content = editor.value.getHTML();
  return content;
};

const updateCurrentUser = (attributes) => {
  currentUser.value = { ...currentUser.value, ...attributes };
  editor.chain().focus().updateUser(currentUser.value).run();
};

const handleSave = () => {
  const content = getContent();
  patchArticleById(props.id, content);
};

async function patchArticleById(id, content) {
  try {
    const patchBody = {
      id: id,
      content: content,
    };
    const { data } = await axios.patch(
      `http://localhost:8000/documents/${id}`,
      patchBody
    );
  } catch (err) {
    console.log(err);
  }
}

const setName = () => {
  const name = (window.prompt("Name") || "").trim().substring(0, 32);
  if (name) {
    updateCurrentUser({
      name,
    });
  }
};

onUnmounted(() => {
  editor.value.commands.setContent({ type: "doc", content: [] });
  editor.value.destroy();
});
</script>
<style lang="scss">
.editor {
  background-color: #fff;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;
  color: #0d0d0d;
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 1000px;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;
    height: 1000px;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #0d0d0d;
    color: #0d0d0d;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0d0d0d, 0.5);
      border-radius: 50%;
      content: " ";
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #b9f18d;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0d0d0d;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0d0d0d;
        color: #fff;
      }
    }
  }
}

.collaboration-cursor__caret {
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0d0d0d;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
