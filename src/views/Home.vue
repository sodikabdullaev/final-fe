<template>
	<div class="border-b">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				Home Page
			</h1>
		</div>
		
	</div>
	<p>I am home view</p>
		<hr>

	<div>
		<button>
			<router-link :to="{ path: '/documents/' }">My Documents</router-link>
		</button>
		</div>
		<hr>

	<div>
		Recent docs
		</div>
</template>
