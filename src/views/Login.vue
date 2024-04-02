<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Username *
            <span class="text-red-600">{{ errors["username"] }}</span>
          </label>
          <div class="mt-2">
            <input
              id="username"
              name="username"
              v-model="username"
              type="username"
              autocomplete="username"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password *
              <span class="text-red-600">{{ errors["password"] }}</span></label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="handleSubmit()"
          >
            {{ sending ? "Logging in..." : "Login" }}
          </button>
        </div>
        <p class="text-sm">
          If you don't have an account yet please
          <router-link class="text-blue-700" to="/user/register">
            Register</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      username: "",
      password: "",
      errors: {},
      sending: false,
    };
  },
  methods: {
    handleSubmit() {
      event.preventDefault();
      this.sending = true;
      if (this.validate() === 0) {
        axios
          .post("http://localhost:8000/login", {
            username: this.username,
            password: this.password,
          })
          .then(({ data }) => {
            localStorage.setItem("currentUser", JSON.stringify(data[0]));
            store.isLoggedIn = true;
            this.$router.push({ path: "/" });
          })
          .catch((err) => {
            console.log(err);
            this.sending = false;
          });
      }
      this.sending = false;
    },
    validate() {
      this.errors = {};
      if (this.username.length < 5)
        this.errors["username"] =
          "Username should be at least 5 character long";
      if (this.password.length < 8)
        this.errors["password"] =
          "Password should be at least 8 character long";
      return Object.keys(this.errors).length;
    },
  },
};
</script>
