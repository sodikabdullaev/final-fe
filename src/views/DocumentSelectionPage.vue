<template>
  <div class="border-b">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Documents Page
      </h1>
    </div>
    <div>
      <button @click="createNewDocument">New Document</button>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Created by
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Team
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Created
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="document in documents"
                :key="document.id"
                class="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800 cursor-pointer"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                >
                  <router-link
                    :to="{
                      name: 'DocumentPage',
                      params: { id: document.id },
                      query: { isNewDocument: 'false' },
                    }"
                  >
                    {{ document.title }}
                  </router-link>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                >
                  <img
                    class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    :src="document.avatar_url"
                    alt=""
                  />
                  {{ document.author }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                >
                  <img
                    class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt=""
                  />
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                >
                  {{ timeAgo(new Date(document.created_at)) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import DocumentPage from "./DocumentPage.vue";
import { timeAgo } from "../compostibles/functions";
import axios from "axios";

const documents = ref([]);
const router = useRouter();
const avatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/documents");
    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }
    const data = await response.json();
    documents.value = data;
  } catch (error) {
    console.error("Error fetching documents:", error.message);
  }
});
async function createNewDocument() {
  const newDocTitle = prompt("Enter document name");
  if (!newDocTitle) {
    console.log("Document must have a title");
    return;
  }
  const newDocument = {
    title: newDocTitle,
    content: "",
    author_id: 1,
    author: "Edgar Burke",
    created_at: Date.now(),
  };
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/documents",
      newDocument
    );
    console.log(response);
    if (response.status === 201) {
      documents.value.push(newDocument);
      router.push({
        name: "DocumentPage",
        params: { id: newDocument.id },
        query: { isNewDocument: "true" },
      });
    }
  } catch (error) {
    console.error("Error creating new document:", error.message);
  }
}
</script>
