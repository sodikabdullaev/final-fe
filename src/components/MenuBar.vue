<!-- @format -->

<template>
	<div>
		<template v-for="(item, index) in items">
			<div
				class="divider"
				v-if="item.type === 'divider'"
				:key="`divider${index}`"
			></div>
			<menu-item v-else :key="index" v-bind="item" />
			<!-- <addImage /> -->
		</template>
	</div>
</template>
<script>
import MenuItem from "./MenuItem.vue";
// import addImage from './InsertImage.vue'
export default {
	components: {
		MenuItem,
	},
	props: {
		editor: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			items: [
				{
					icon: "bold",
					title: "Bold",
					action: () => this.editor.chain().focus().toggleBold().run(),
					isActive: () => this.editor.isActive("bold"),
				},
				{
					icon: "italic",
					title: "Italic",
					action: () => this.editor.chain().focus().toggleItalic().run(),
					isActive: () => this.editor.isActive("italic"),
				},
				{
					icon: "strikethrough",
					title: "Strike",
					action: () => this.editor.chain().focus().toggleStrike().run(),
					isActive: () => this.editor.isActive("strike"),
				},
				{
					type: "divider",
				},

				{
					icon: "h-1",
					title: "Heading 1",
					action: () =>
						this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
					isActive: () => this.editor.isActive("heading", { level: 1 }),
				},
				{
					icon: "h-2",
					title: "Heading 2",
					action: () =>
						this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
					isActive: () => this.editor.isActive("heading", { level: 2 }),
				},
				{
					type: "divider",
				},
				{
					icon: "paragraph",
					title: "Paragraph",
					action: () => this.editor.chain().focus().setParagraph().run(),
					isActive: () => this.editor.isActive("paragraph"),
				},
				{
					icon: "align-left",
					title: "TextAlign",
					action: () => this.editor.chain().focus().setTextAlign("left").run(),
					isActive: () => this.editor.isActive({ textAlign: "left" }),
				},
				{
					icon: "align-center",
					title: "TextAlign",
					action: () =>
						this.editor.chain().focus().setTextAlign("center").run(),
					isActive: () => this.editor.isActive({ textAlign: "center" }),
				},
				{
					icon: "align-right",
					title: "TextAlign",
					action: () => this.editor.chain().focus().setTextAlign("right").run(),
					isActive: () => this.editor.isActive({ textAlign: "right" }),
				},
				{
					icon: "align-justify",
					title: "TextAlign",
					action: () =>
						this.editor.chain().focus().setTextAlign("justify").run(),
					isActive: () => this.editor.isActive({ textAlign: "justify" }),
				},

				{
					icon: "list-unordered",
					title: "Bullet List",
					action: () => this.editor.chain().focus().toggleBulletList().run(),
					isActive: () => this.editor.isActive("bulletList"),
				},
				{
					icon: "list-ordered",
					title: "Ordered List",
					action: () => this.editor.chain().focus().toggleOrderedList().run(),
					isActive: () => this.editor.isActive("orderedList"),
				},
				{
					icon: "list-check-2",
					title: "Task List",
					action: () => this.editor.chain().focus().toggleTaskList().run(),
					isActive: () => this.editor.isActive("taskList"),
				},
				{
					icon: "code-view",
					title: "Code",
					action: () => this.editor.chain().focus().toggleCode().run(),
					isActive: () => this.editor.isActive("code"),
				},
				{
					icon: "code-box-line",
					title: "Code Block",
					action: () => this.editor.chain().focus().toggleCodeBlock().run(),
					isActive: () => this.editor.isActive("codeBlock"),
				},
				{
					type: "divider",
				},
				{
					icon: "double-quotes-l",
					title: "Blockquote",
					action: () => this.editor.chain().focus().toggleBlockquote().run(),
					isActive: () => this.editor.isActive("blockquote"),
				},
				{
					icon: "separator",
					title: "Horizontal Rule",
					action: () => this.editor.chain().focus().setHorizontalRule().run(),
				},
				{
					type: "divider",
				},
				{
					icon: "text-wrap",
					title: "Hard Break",
					action: () => this.editor.chain().focus().setHardBreak().run(),
				},
				{
					icon: "format-clear",
					title: "Clear Format",
					action: () =>
						this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
				},
				{
					type: "divider",
				},
				{
					icon: "arrow-go-back-line",
					title: "Undo",
					action: () => this.editor.chain().focus().undo().run(),
				},
				{
					icon: "arrow-go-forward-line",
					title: "Redo",
					action: () => this.editor.chain().focus().redo().run(),
				},
			],
		};
	},
};
</script>
<style lang="scss">
.divider {
	background-color: rgba(#fff, 0.25);
	height: 1.25rem;
	margin-left: 0.5rem;
	margin-right: 0.75rem;
	width: 1px;
}
</style>
