<script setup>
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { store } from "./store";

store.isLoggedIn = localStorage.getItem("currentUser") !== null;
</script>

<template>
  <div class="min-h-full">
    <Nav />

    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
