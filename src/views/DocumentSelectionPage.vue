<template>
  <div class="border-b">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Documents
      </h1>
    </div>
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
                   <template v-for="collaboration in document.collaborations">
        <img
          class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          :src="collaboration.avatar_url"
          :alt="collaboration.name"
        />
      </template>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                >
                  {{ timeAgo(new Date(document.created_at)) }}
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
    documents.value = data.map(document => ({
      ...document,
      collaborations: [],
    }));

    await Promise.all(
        documents.value.map(async document => {
          const collaboratorsResponse = await axios.get(`http://127.0.0.1:8000/documents/${document.id}/collaborations`);
          if (collaboratorsResponse.status === 200) {
            document.collaborations = collaboratorsResponse.data;
          }
        })
      );
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
