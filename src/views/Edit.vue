<template>
	<div class="border-b">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				Edit Page
			</h1>
		</div>
	</div>
	<QuillEditor
		:options="options"
		v-model:content="textData"
		content-type="html"
	/>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'
export default {
	components: {
		QuillEditor,
	},
	data() {
		return {
			textData: '',
			options: {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'], // toggled buttons
						['blockquote', 'code-block'],
						['link', 'image', 'video', 'formula'],

						[{ header: 1 }, { header: 2 }], // custom button values
						[
							{ list: 'ordered' },
							{ list: 'bullet' },
							{ list: 'check' },
						],
						[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
						[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
						[{ direction: 'rtl' }], // text direction

						[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
						[{ header: [1, 2, 3, 4, 5, 6, false] }],

						[{ color: [] }, { background: [] }], // dropdown with defaults from theme
						[{ font: [] }],
						[{ align: [] }],

						['clean'],
					],
				},
				placeholder: 'Start typing...',
				readOnly: false,
				theme: 'snow',
			},
		}
	},
	methods: {
		async getDocumentContent() {
			const { data } = await axios.get(
				'https://api.coindesk.com/v1/bpi/currentprice.json'
			)
			this.textData = data.disclaimer
		},
	},
	mounted() {
		this.getDocumentContent()
	},
}
</script>
