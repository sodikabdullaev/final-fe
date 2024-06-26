<!-- @format -->

<template>
	<div class="editor" v-if="editor">
		<menu-bar class="editor__header" :editor="editor" />
		<menu class="editor__second__header" :editor="editor">
			<button
				type="button"
				class="invite justify-self-center text-white-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
				@click="createInvite()"
			>
      
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
					/>
				</svg>
				Invite Collaborators
			</button>
		</menu>

		<div id="parent">
			<bubble-menu
				class="bubble-menu"
				:tippy-options="{ duration: 100 }"
				:editor="editor"
			>
				<button
					@click="
						editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()
					"
					:class="{
						'is-active': editor.isActive('highlight', { color: '#ffc078' }),
					}"
					:style="{ backgroundColor: '#ffc078' }"
				></button>
				<button
					@click="
						editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()
					"
					:class="{
						'is-active': editor.isActive('highlight', { color: '#8ce99a' }),
					}"
					:style="{ backgroundColor: '#8ce99a' }"
				></button>
				<button
					@click="
						editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()
					"
					:class="{
						'is-active': editor.isActive('highlight', { color: '#74c0fc' }),
					}"
					:style="{ backgroundColor: '#74c0fc' }"
				></button>
				<button
					@click="
						editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()
					"
					:class="{
						'is-active': editor.isActive('highlight', { color: '#b197fc' }),
					}"
					:style="{ backgroundColor: '#b197fc' }"
				></button>
				<button
					@click="
						editor.chain().focus().toggleHighlight({ color: 'red' }).run()
					"
					:class="{
						'is-active': editor.isActive('highlight', { color: 'red' }),
					}"
					:style="{ backgroundColor: `red` }"
				></button>
				<button
					@click="
						editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()
					"
					:class="{
						'is-active': editor.isActive('highlight', { color: '#ffa8a8' }),
					}"
					:style="{ backgroundColor: `#ffa8a8` }"
				></button>
			</bubble-menu>
		</div>
		<editor-content class="editor__content" :editor="editor" />
		<div class="editor__footer">
			<div :class="`editor__status editor__status--${status}`">
				<template v-if="status === 'connected'">
					{{ editor?.storage?.collaborationCursor?.users.length }} user{{
						editor?.storage?.collaborationCursor?.users.length === 1 ? "" : "s"
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
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Code from "@tiptap/extension-code";
import { useRoute } from "vue-router";
import { HocuspocusProvider } from "@hocuspocus/provider";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Dropcursor from "@tiptap/extension-dropcursor";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import * as Y from "yjs";
import { variables } from "../variables.js";
import MenuBar from "./MenuBar.vue";
import Comments from "./Comments.vue";
import CommentButton from "./CommentButton.vue";
import CommentAdder from "./CommentAdder.vue";
import { store } from "../store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

store.isFormVisible = false;

const getRandomRoom = () => {
	const roomNumbers = variables.collabRooms?.trim()?.split(",") ?? [10, 11, 12];
	return getRandomElement(roomNumbers.map((number) => `rooms.${number}`));
};

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
const room = ref(null);

const toggleHighlight = () => {
	editor.value.chain().focus().toggleHighlight().run();
};

const isOrange = () => editor.value.isActive("highlight", { color: "#ffc078" });
const isGreen = () => editor.value.isActive("highlight", { color: "#8ce99a" });
const isBlue = () => editor.value.isActive("highlight", { color: "#74c0fc" });
const isPurple = () => editor.value.isActive("highlight", { color: "#b197fc" });
const isRed = () => editor.value.isActive("highlight", { color: "red" });
const isPink = () => editor.value.isActive("highlight", { color: "#ffa8a8" });


const createInvite = () => {
	let inviteCode = localStorage.getItem("inviteCode");
	if (!inviteCode) {
		inviteCode = uuidv4();
		localStorage.setItem("inviteCode", inviteCode);
	}
	alert(inviteCode);
};

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
			StarterKit.configure({
				history: false,
			}),
			Highlight.configure({ multicolor: true }),
			TaskList,
			TaskItem,
			Image,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),

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
		background: #3e4955;
		border-bottom: 3px solid #0d0d0d;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		height: 60px;
		display: flex;
		flex: 0 0 auto;
		flex-wrap: wrap;
		padding: 0.25rem;
	}
	&__header {
		align-items: center;
		background: #3e4955;
		border-bottom: 3px solid #0d0d0d;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		height: 50px;
		display: flex;
		flex: 0 0 auto;
		flex-wrap: wrap;
		padding: 0.25rem;
	}
	&__second__header {
		align-items: center;
		background: #3e4955;
		border-bottom: 3px solid #0d0d0d;
		// border-top-left-radius: 0.25rem;
		// border-top-right-radius: 0.25rem;
		height: 50px;
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
		background-color: #ffe066;
		padding: 0.125em 0;
		border-radius: 0.25em;
		box-decoration-break: clone;
	}
	img {
		max-width: 100%;
		height: auto;
		&.ProseMirror-selectednode {
			outline: 3px solid #68cef8;
		}
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
.bubble-menu {
	display: flex;
	background-color: #000000;
	padding: 0.2rem;
	border-radius: 0.5rem;
	border: 2px solid #0d0d0d;
	button {
		border: 1px solid #0d0d0d;
		background: none;
		color: #fff;
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0 0.2rem;
		border-radius: 0.5rem;
		opacity: 1;
		margin-right: 8px;
		width: 30px;
		height: 20px;
		&:hover,
		&.is-active {
			opacity: 1;
		}
	}
}
.invite {
  display: flex;
  color: #fff;
  &.is-active,
  &:hover {
    background-color: #303030;
  }
}
</style>
