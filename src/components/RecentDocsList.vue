
<template >

<div  class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 content-center justify-self-center" >
<h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
Recent Documents
</h5>
<h6 v-if="recentDocs && recentDocs.length === 0" class="mb-3 text-base font-semibold text-gray-900 md:text-m dark:text-white"> No recent documents </h6>
<ul class="my-4 space-y-3" ref="recent-docs" v-for="doc in recentDocs" :key="doc.id">
<RecentDocCard v-if="doc" :doc="doc"></RecentDocCard>
</ul>
</div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js'
import RecentDocCard from './RecentDocCard.vue';
import { ref } from 'vue';



    
    // const recentDocs = ref(null)
    
    // axios
    //         .get(`http://localhost:8000/documents`)
    //         .then(({ data }) => {
    //         recentDocs.value = data
    //         return recentDocs
    //     })
    //         .catch((err) => err);


axios
  .get(`http://localhost:8000/documents`)
  .then(({ data }) => {
    recentDocs.value = data;
    return recentDocs;
  })
  .catch((err) => err);


 export default {

    data() {
        return {
            recentDocs: store.recentDocs
        };
    },
    methods: {
        async getRecentDocs() {
            try {
                console.log('hello in methods')
                const { data } = await axios.get("http://localhost:8000/documents");
                store.recentDocs = data;
            }
            catch (err) {
                return err
            }
        }
    },
    mounted() {
        console.log('hello in mounted')
        axios
            .get(`http://localhost:8000/documents`)
            .then(({ data }) => {
            store.recentDocs = data;
            console.log(store.recentDocs);
        })
            .catch((err) => err);
    },
    watch: {
        recentDocs: {
            handler() {
                console.log('in watcher');
                this.getRecentDocs;
            }
        }
    },
    components: { RecentDocCard }
} 





</script>

