<template>
  <div class="border-b">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Home Page</h1>
    </div>
  </div>
  <div class="bg-white flex flex-col items-center justify-start min-h-screen py-8 mt-40">
    <div class="container mx-1/2 mt-50">
      <div class="min-w-50 min-h-fit grid justify-items-stretch">
        <button
          type="button"
          class="justify-self-center w-full max-w-md text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
          @click="createNewDocument"
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          Create New Document
        </button>
        <RecentDocsList class="justify-self-center"></RecentDocsList>
      </div>
    </div>
  </div>

  <!-- <hr>

	<div>
		<button>
			<router-link :to="{ path: '/documents/' }">My Documents</router-link>
		</button>
		</div>
		<hr>

  <p>I am home view</p> -->
</template>
<script>
import RecentDocsList from "../components/RecentDocsList.vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const documents = ref([]);

export default {
  components: {
    RecentDocsList,
  },
  methods: {
    createNewDocument() {
      const newDocument = {
        id: uuidv4(),
        title: "New Document",
        content: "",
        created_at: new Date().toISOString(),
      };
      documents.value.push(newDocument);
      this.$router.push({
        name: "DocumentPage",
        params: { id: newDocument.id },
        query: { isNewDocument: "true" },
      });
    },
  },
};
</script>
