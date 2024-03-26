<template>
	<!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
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
				Register account
			</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form class="space-y-6" action="#" method="POST">
				<div>
					<label
						for="email"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Username *
						<span class="text-red-600">{{
							errors['username']
						}}</span>
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
							<span class="text-red-600">{{
								errors['password']
							}}</span></label
						>
					</div>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							v-model="password"
							type="password"
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
							>Confirm Password *
							<span class="text-red-600">{{
								errors['confirmPassword']
							}}</span></label
						>
					</div>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							v-model="confirmPassword"
							type="password"
							required="true"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<button
						type="click"
						@click="handleSubmit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						{{ sending ? 'Registering...' : 'Register' }}
					</button>
				</div>
				<p class="text-sm">
					If you already have an account please
					<router-link to="/user/login" class="text-blue-700"
						>Login</router-link
					>
				</p>
			</form>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	data() {
		return {
			username: '',
			password: '',
			confirmPassword: '',
			errors: {},
			sending: false,
		}
	},
	methods: {
		handleSubmit() {
			event.preventDefault()
			this.sending = true
			if (this.validate() === 0) {
				axios
					.post('http://localhost:8000/users', {
						username: this.username,
						password: this.password,
					})
					.then((data) => {
						//if successfull we are gonna set user to localstorage.
						console.log('Valid credentials given, successfull.')
					})
					.catch((err) => {
						//if fail we add error to errors obj
						console.log(err)
					})
			}
			this.sending = false
		},
		validate() {
			this.errors = {}
			if (this.username.length < 5)
				this.errors['username'] =
					'Username should be at least 5 character long'
			if (this.password.length < 8)
				this.errors['password'] =
					'Password should be at least 8 character long'
			if (this.confirmPassword !== this.password)
				this.errors['confirmPassword'] =
					'Confirm password should match with password'

			return Object.keys(this.errors).length
		},
	},
}
</script>
